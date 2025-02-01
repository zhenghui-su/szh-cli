import path from "path";
import fs from "fs-extra";
import { askCreateType, askNeedDebugUI, askNeedTypeScript } from "./askUser"; // 确保路径正确
import { loading } from "../../utils/loading"; // 确保路径正确

/**
 * 根据用户选择复制模板文件
 * @param projectName - 项目名
 * @param targetDirectory - 目标目录
 */
async function copyTemplateFiles(projectName: string, targetDirectory: string) {
  try {
    const dir = path.resolve(__dirname, "../../..");
    // 拼接模板目录路径
    const templateSrcDir = path.join(dir, "templates");

    const projectType = await askCreateType();
    let needTypeScript = false;
    if (projectType !== "koa") {
      // 如果需要 TypeScript，则选择 TypeScript 模板
      needTypeScript = await askNeedTypeScript();
    }
    let needDebugUI: boolean;
    if (projectType === "three") {
      needDebugUI = await askNeedDebugUI();
    }
    const specificTemplateDir = path.join(
      templateSrcDir,
      `template-${projectType}${needTypeScript ? "-ts" : ""}`
    );

    // 读取模板目录中的文件和目录
    const files = await fs.readdir(specificTemplateDir);

    // 使用 loading 函数包装复制操作
    await loading(
      `正在复制模板文件到 ${targetDirectory}...`,
      async () => {
        for (const file of files) {
          const srcFilePath = path.join(specificTemplateDir, file);
          const destFilePath = path.join(targetDirectory, file);

          // 复制文件或目录
          await fs.copy(srcFilePath, destFilePath);
        }
        // 修改 package.json 文件中的 name 字段
        const packageJsonPath = path.join(targetDirectory, "package.json");
        if (await fs.pathExists(packageJsonPath)) {
          const packageJson = await fs.readJson(packageJsonPath);
          packageJson.name = projectName;
          await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        }
        // 如果是Threejs项目且需要DebugUI,则加入DebugUI依赖
        if (projectType === "three" && needDebugUI) {
          const packageJsonPath = path.join(targetDirectory, "package.json");
          const srcPath = path.join(targetDirectory, "src");
          const mainFilePath = path.join(
            srcPath,
            "main." + (needTypeScript ? "ts" : "js")
          );
          if (await fs.pathExists(packageJsonPath)) {
            const packageJson = await fs.readJson(packageJsonPath);
            packageJson.dependencies["lil-gui"] = "^0.19.2";
            await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
          }
          if (await fs.pathExists(mainFilePath)) {
            const mainFileContent = await fs.readFile(mainFilePath, "utf8");
            const lines = mainFileContent.split("\n");
            // 插入 import 语句到第4行
            lines.splice(3, 0, `import { GUI } from 'lil-gui';`);

            // 插入初始化语句到第6行
            lines.splice(5, 0, `const gui = new GUI();\n`);

            // 插入 gui.add 语句到40行初始为camera的postion属性
            lines.splice(
              30,
              0,
              `gui.add(camera.position, 'x').min(-3).max(3).step(0.01);\n`
            );

            const updatedContent = lines.join("\n");
            await fs.writeFile(mainFilePath, updatedContent);
          }
        }
      },
      { projectName, operationType: "createProject" }
    );
  } catch (err) {
    console.error(`Error copying files: ${err}`);
  }
}

export default copyTemplateFiles;

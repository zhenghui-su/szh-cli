import path from "path";
import fs from "fs-extra";
import { askCreateType, askNeedTypeScript } from "./askUser"; // 确保路径正确
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
    let needTypeScript;
    if (projectType !== "koa") {
      // 如果需要 TypeScript，则选择 TypeScript 模板
      needTypeScript = await askNeedTypeScript();
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
      },
      { projectName, operationType: "createProject" }
    );
  } catch (err) {
    console.error(`Error copying files: ${err}`);
  }
}

export default copyTemplateFiles;

import prompt from "../../utils/prompt";

/** 询问是否覆盖 */
export const askOverwrite = async () => {
  const { isOverwrite } = await prompt([
    // 返回值为 Promise
    // 具体配置参见：https://www.npmjs.com/package/inquirer#questions
    {
      type: "list",
      name: "isOverwrite",
      message: "原目录已经存在，请选择是否覆盖",
      choices: [
        { name: "覆盖", value: true },
        { name: "取消", value: false },
      ],
    },
  ]);

  return isOverwrite;
};

/** 询问要创建的项目类型 */
export const askCreateType = async () => {
  const { projectType } = await prompt([
    // 返回值为 Promise
    // 具体配置参见：https://www.npmjs.com/package/inquirer#questions
    {
      type: "list",
      name: "projectType",
      message: "请选择你要创建的项目类型",
      choices: [{ name: "react", value: "react" }],
    },
  ]);

  return projectType;
};

/** 询问是否需要 TypeScript */
export const askNeedTypeScript = async () => {
  const { needTypeScript } = await prompt([
    // 返回值为 Promise
    // 具体配置参见：https://www.npmjs.com/package/inquirer#questions
    {
      type: "list",
      name: "needTypeScript",
      message: "是否需要 TypeScript ?",
      choices: [
        { name: "需要", value: true },
        { name: "不需要", value: false },
      ],
    },
  ]);

  return needTypeScript;
};

import prompt from "../../utils/prompt";
import chalk from "chalk";
import { ProjectType } from "../../types";

/**
 * 询问项目名称
 */
export const askProjectName = async () => {
  const { projectName } = await prompt([
    {
      type: "input",
      name: "projectName",
      message: chalk.reset("请输入项目名称:"),
      default: "my-project",
      transformer: (input: string) => {
        return chalk.reset(input);
      },
    },
  ]);
  return projectName;
};

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

type ProjectChoicesType = {
  name: string;
  value: ProjectType;
};

const ProjectChoices: ProjectChoicesType[] = [
  { name: chalk.cyan("React"), value: "react" },
  { name: chalk.green("Vue"), value: "vue" },
  { name: chalk.yellow("Koa"), value: "koa" },
];

/** 询问要创建的项目类型 */
export const askCreateType = async (): Promise<ProjectType> => {
  const { projectType } = await prompt([
    // 返回值为 Promise
    // 具体配置参见：https://www.npmjs.com/package/inquirer#questions
    {
      type: "list",
      name: "projectType",
      message: chalk.reset("请选择你要创建的项目类型"),
      default: "react",
      choices: ProjectChoices,
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
      message: chalk.reset("是否需要 TypeScript ?"),
      choices: [
        { name: "需要", value: true },
        { name: "不需要", value: false },
      ],
    },
  ]);

  return needTypeScript;
};

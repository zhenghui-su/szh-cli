import chalk from "chalk";
import prompt from "../../utils/prompt";

/**
 * 询问主机地址
 */
export const askHost = async () => {
  const { host } = await prompt([
    {
      type: "input",
      name: "host",
      message: "请输入主机地址:",
      validate: (input: string) => {
        if (!input) {
          return chalk.red("项目名称不能为空，请重新输入:");
        }
        return true;
      },
    },
  ]);
  return host;
};
/**
 * 询问用户名和密码
 */
export const askUsernameAndPassword = async () => {
  const { username, password } = await prompt([
    {
      type: "input",
      name: "username",
      message: "请输入用户名:",
      default: "root",
    },
    {
      type: "password",
      name: "password",
      message: "请输入密码:",
      mask: "*",
      validate: (input: string) => {
        if (!input) {
          return chalk.red("密码不能为空，请重新输入:");
        }
        return true;
      },
    },
  ]);
  return { username, password };
};

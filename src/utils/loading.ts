import ora from "ora";
import chalk from "chalk";
import { LoadingOtherParams } from "../types";

/**
 * 睡眠函数
 * @param {Number} delay 睡眠时间
 */
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, delay);
  });
};

/**
 * 加载中方法
 * @param message - 提示信息
 * @param callback - 执行的回调
 * @param other - 项目其他信息
 * @param retryCount - 当前重试次数
 * @param maxRetries - 最大重试次数
 * @returns
 */
export const loading = async (
  message: string,
  callback: () => any,
  other: LoadingOtherParams,
  retryCount = 0, // 默认值可以省略类型注解
  maxRetries = 3 // 默认值可以省略类型注解
): Promise<any> => {
  const spinner = ora(message);
  spinner.start(); // 开启加载

  try {
    const res = await callback();
    // 加载成功
    if (other.operationType === "createProject") {
      spinner.succeed(
        `${chalk.black.bold("创建成功！执行以下命令打开并运行项目:")}
        \r\n  ${chalk.gray.bold(`cd ${other?.projectName}`)}
        \r\n  ${chalk.gray.bold("npm install")}
        \r\n  ${chalk.gray.bold("npm run dev")}
        \r\n  ${chalk.gray.bold(
          "问题、意见、建议请反馈至: https://github.com/zhenghui-su/szh-cli/issues"
        )}
        `
      );
    } else if (other.operationType === "connectServer") {
      spinner.succeed(
        `${chalk.green("已成功连接到服务器!")}
        \r\n  ${chalk.gray.bold(
          "问题、意见、建议请反馈至: https://github.com/zhenghui-su/szh-cli/issues"
        )}
        `
      );
    }
    return res;
  } catch (error) {
    // 加载失败
    if (retryCount < maxRetries) {
      if (other.operationType === "createProject") {
        spinner.fail("创建失败, 正在重试...");
      } else if (other.operationType === "connectServer") {
        spinner.fail("连接失败, 正在重试...");
      }
      await sleep(1000);
      // 重新拉取
      return loading(message, callback, other, retryCount + 1, maxRetries);
    } else {
      // 达到最大重试次数
      if (other.operationType === "createProject") {
        spinner.fail("创建失败, 已达到最大重试次数");
      } else if (other.operationType === "connectServer") {
        spinner.fail("连接失败, 已达到最大重试次数");
      }
    }
  }
};

import { program } from "commander";
import chalk from "chalk";
import { create } from "./commands/index";
import { BRAND_LOGO, VERSION } from "./const";

const runner = () => {
  program
    .name(chalk.cyan("szh"))
    .usage(`${chalk.yellow("<command>")} [options]`);

  program.version(
    `\r\n  ${chalk.cyan.bold(VERSION)}
    ${chalk.cyan.bold(BRAND_LOGO)}`
  );

  create();

  program.on("--help", function () {
    console.log(
      `\r\n终端执行 ${chalk.cyan.bold(
        "szh <command> --help"
      )} 获取更多命令详情\r\n`
    );
  });

  program.parse(process.argv);
};

export default runner;

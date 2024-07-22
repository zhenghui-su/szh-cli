import { program } from "commander";
import chalk from "chalk";
import ssh from "./ssh";

export default () => {
  program
    .command("ssh [host]")
    .description(chalk.cyan("链接到远程服务器"))
    .option("-h, --help", chalk.red("实验性功能, 谨慎使用"))
    .action(ssh);
};

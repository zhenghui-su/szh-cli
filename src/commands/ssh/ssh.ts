import { Client } from "ssh2";
import inquirer from "inquirer";
import chalk from "chalk";
import { loading } from "../../utils/loading";

const connectToServer = async (
  host: string,
  username: string,
  password: string
): Promise<void> => {
  const conn = new Client();
  return new Promise<void>((resolve, reject) => {
    conn
      .on("ready", () => {
        conn.shell((err: any, stream: any) => {
          if (err) throw err;
          process.stdin.pipe(stream);
          stream.pipe(process.stdout);
        });
        resolve();
      })
      .on("error", (err: any) => {
        reject(err);
      })
      .connect({
        host,
        port: 22,
        username,
        password,
      });
  });
};

export default async (host: string): Promise<void> => {
  const questions = [
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
    },
  ];

  const answers = await inquirer.prompt(questions);

  const username = answers.username;
  const password = answers.password;

  if (!username || !password) {
    console.log(chalk.red("用户名和密码是必需的"));
    return;
  }

  await loading(
    "正在连接服务器...",
    () => connectToServer(host, username, password),
    { operationType: "connectServer" }
  );
};

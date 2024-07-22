import { Client } from "ssh2";
import { loading } from "../../utils/loading";
import { askHost, askUsernameAndPassword } from "./askUser";

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
  if (!host) {
    host = await askHost();
  }
  const { username, password } = await askUsernameAndPassword();

  await loading(
    "正在连接服务器...",
    () => connectToServer(host, username, password),
    { operationType: "connectServer" }
  );
};

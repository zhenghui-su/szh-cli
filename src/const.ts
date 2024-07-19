import fs from "fs-extra";
import path from "node:path";

/** 当前根目录 */
export const ROOT_DIR = path.resolve(__dirname, "../");

const { version } = fs.readJSONSync(path.resolve(ROOT_DIR, "package.json"));

/** https://tooltt.com/art-ascii/ font: ANSI Shadow */
export const BRAND_LOGO = `
███████╗███████╗██╗  ██╗
██╔════╝╚══███╔╝██║  ██║
███████╗  ███╔╝ ███████║
╚════██║ ███╔╝  ██╔══██║
███████║███████╗██║  ██║
╚══════╝╚══════╝╚═╝  ╚═╝
`;

/** 当前版本号 */
export const VERSION = version;

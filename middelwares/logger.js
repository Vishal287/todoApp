import chalk from "chalk";
import { METHODS } from "../tokens/methods.js";
import { STATUS_CODES } from "../tokens/statusCode.js";

export function logger(req, res, next) {
  const path = req.url;
  let method = req.method;
  let code = res.statusCode;
  const ip = req.ip;

  if (code === STATUS_CODES[200]) {
    code = chalk.greenBright(res.statusCode);
  } else if (code === STATUS_CODES[400]) {
    code = chalk.redBright(res.statusCode);
  } else {
    code = chalk.yellowBright(res.statusCode);
  }

  if (method === METHODS.GET) method = chalk.overline.bold.yellow(method);
  else if (method === METHODS.POST) method = chalk.overline.bold.green(method);
  else if (method === METHODS.DELETE) method = chalk.overline.bold.red(method);
  else if (method === METHODS.PATCH) method = chalk.overline.bold.blue(method);

  console.log(`${chalk.blue(path)} | ${code} | ${method} | ${ip}`);
  next();
}

import * as dotenv from "dotenv";
import { inspect } from "util";

dotenv.config();
global.inspect = (data, options = {}) => console.log(inspect(data, { colors: true, ...options }));

export const { ACCOUNT_ADDRESS, ACCOUNT_PRIVATE_KEY, RPC_API_KEY } = process.env;

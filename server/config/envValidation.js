import {cleanEnv, port, str, num} from "envalid";
import dotenv from "dotenv";
//_________ENV_VARIABLES_________//
dotenv.config();

//Validation on .env variables before running sever
export default cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str(),
  SERVER_URL: str(),
  API_URL: str(),
  MONGO_URI: str(),
  DB_NAME: str(),
  JWT_SECRET: str(),
  JWT_EXPIRE_IN: str(),
  JWT_COOKIE_EXPIRE_IN: num(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
});

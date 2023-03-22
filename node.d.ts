import { Dialect } from "sequelize";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        DB_NAME: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_DIALECT: Dialect;
      }
    }
  }
  
import { CreateCache, CreateDataBase, Config } from "ado-node";
import * as mysql from "mysql";
import { EventEmitter } from "node:stream";
import { createClient } from "redis";
import { CONSTANT } from "./constant";
@Config
export class CommonClass {
  @CreateDataBase(CONSTANT.MYSQL)
  public async CreateDB() {
    const config = {
      host: "localhost",
      user: "root",
      password: "12345678",
      database: "ado", //所用数据库
      port: "3306",
    };
    const conn = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });
    return conn;
  }
  @CreateCache(CONSTANT.REDIS)
  public async CreateCache() {
    return createClient();
  }
}

export const Event = new EventEmitter();

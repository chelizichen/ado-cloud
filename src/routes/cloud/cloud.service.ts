import { Server_Info } from "./cloud.enity";
import { Collect, Inject, UseCache } from "ado-node";
import { exec, spawn } from "node:child_process";
import { rename } from "node:fs";
import { RedisClientType } from "redis";
import { CONSTANT } from "../../config/constant";

// 压缩命令
// tar -cvf AdoTestServer.tgz ./dist package.json node_modules

@Collect()
export class CloudService {
  @UseCache(CONSTANT.REDIS)
  redis!: RedisClientType;

  @Inject(Server_Info)
  Server_Info!: Server_Info;

  async getRedisStats() {
    console.log(this.redis);
    // await this.redis.connect();
    if (this.redis.isOpen) {
      this.redis.hGet("ado:server", "AdoTest3003Server").then((res) => {
        console.log("res", res);
      });
    } else {
      this.redis.connect().then(() => {
        this.redis.hGet("ado:server", "AdoTest3003Server").then((res) => {
          console.log("res", res);
        });
      });
    }
  }

  async getStatsByServerName(serverName: string) {
    return new Promise((resolve, reject) => {
      const server_pid = this.redis.hGet("ado:server", serverName);
      exec(`ps -ef ${server_pid}`, function (err, stdout) {
        if (err) {
          reject(err);
        }
        console.log("stdout", stdout);
        resolve(stdout);
      });
    });
  }

  async getStatsList() {
    this.redis.hGetAll("ado:server");
  }

  async getServerList() {
    const data = await this.Server_Info.getList();
    return data;
  }

  async saveServer(val: any) {
    console.log(val);

    this.Server_Info.save(val);
  }

  getFileList() {
    return new Promise((resolve, reject) => {
      exec("ls public/server", function (err, stdou, stderr) {
        if (err) {
          reject(err);
        }
        console.log(stdou);

        const lsarray = stdou.split("\n").filter((el) => {
          return el.endsWith(".tgz") && el;
        });

        resolve({ ls: lsarray, stderr });
      });
    });
  }

  // 创建 Server 目录
  cd_dir(dirName: string) {
    return new Promise(async (resolve, reject) => {
      exec(`cd public/server \n mkdir -p ${dirName}`, function (err) {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }

  // 解压相关文件
  de_comp(originName: string, dirName: string) {
    return new Promise((resolve, reject) => {
      exec(
        `tar zxvf public/server/${originName} -C ./public/server/${dirName}`,
        function (err) {
          if (err) {
            reject(err);
          }
          resolve(true);
        }
      );
    });
  }

  // 改名
  re_name(oldpath: string, serverName: string) {
    return new Promise((resolve, reject) => {
      const newPath = "public/server/" + serverName;
      rename(oldpath, newPath, function (err) {
        if (err) {
          reject(err);
        }
        const name_dir = serverName.substring(0, serverName.length - 4);
        const server_path = newPath;
        resolve({
          name_tgz: serverName,
          name_dir,
          server_path,
        });
      });
    });
  }

  // filename 和 originalname
  upload(fileName: string, fileAndDirName: string) {
    return new Promise((resolve, _rej) => {
      this.cd_dir(fileAndDirName).then((res) => {
        if (res === true) {
          this.de_comp(fileName, fileAndDirName).then((res) => {
            if (res == true) {
              const nodePath = `node public/server/${fileAndDirName}/dist/index.js`;

              const c_process = spawn(nodePath, {
                stdio: "pipe",
                shell: true,
                env: process.env,
              });
              // 存储pid 到临时的 redis 上
              console.log("c_process.pid", c_process.pid);
              this.redis.connect().then(() => {
                this.redis.hSet(
                  `ado:server`,
                  fileAndDirName,
                  `${c_process.pid}`
                );
              });

              c_process.stdout?.on("data", function (chunk) {
                console.log("chunk", c_process.pid, chunk.toString());
              });

              resolve(fileAndDirName + " 服务开启！");
            }
          });
        }
      });
    });
  }
}

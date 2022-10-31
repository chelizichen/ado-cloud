import { Server_Info } from "./cloud.enity";
import { Collect, Inject } from "ado-node";
import { exec, spawn } from "node:child_process";
import { rename } from "node:fs";

// 压缩命令
// tar -cvf AdoTestServer.tgz ./dist package.json node_modules

@Collect()
export class CloudService {
  @Inject(Server_Info)
  Server_Info!: Server_Info;

  getPortList() {}

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

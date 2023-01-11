import { Collect, Inject } from "ado-node";
import { cloud } from "./cloud.entity";
import { spawn, exec } from "node:child_process";
import { mkdirSync } from 'fs'
@Collect()
export class cloudService {
    @Inject(cloud)
    Cloud!: cloud

    run(uu_id: string) {
        return uu_id
    }

    run_upload(file_path: string) {
        return new Promise(async (resolve,reject) => {
            //得到目录
            let get_dir = file_path.split(".")[0];
            let tar_cmd = "tar zxvf " + file_path + " -C ./" + get_dir;
            // 1 创建目录
            mkdirSync(get_dir);
            // 2 解压
            try {
                await this.deCompress(tar_cmd);
            } catch (e) {
                reject(e);
            }
            // 进入当前目录 并且执行
            let run_cmd = `cd ${get_dir} \n npm run preview`;
            let c_process = spawn(run_cmd, {
              stdio: "pipe",
              shell: true,
              env: process.env,
            });
            c_process.stderr.on("data", function (chunk) {
                console.log("错误", chunk);
            })
            c_process.stdout.on("data", function (chunk) {
                console.log("服务日志", chunk.toString());
            });
            resolve(true);
        })
    }

    update() {
        // const std = spawn(
        //   `cd public/server/AdoNodeTestServer \n npm run preview`,
        //   {
        //     stdio: "pipe",
        //     shell: true,
        //     env: process.env,
        //   }
        // );

        // std.stdout.on("data", function (chunk) {
        //     console.log('写入',chunk.toString());
        // })
        
    }

    deCompress(cmd: string) {
        return new Promise((resolve, reject) => {
            exec(cmd, function (err) {
                if (err) {
                    reject(false)
                }
                resolve(true)
            })
        })
    }
}
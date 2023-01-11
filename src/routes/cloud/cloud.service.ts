import { Collect, Inject } from "ado-node";
import { cloud } from "./cloud.entity";
import { spawn, exec } from "node:child_process";
import { mkdirSync,readdirSync } from 'fs'
// import readpkg from 'read-package'
@Collect()
export class cloudService {
    @Inject(cloud)
    Cloud!: cloud

    run(uu_id: string) {
        return uu_id
    }

    async list(){
        let _list:any[] = []
        let _dir = readdirSync("public/server")
        for(let i = 0;i<_dir.length;i++){
            let _curr = _dir[i]
            if(!_curr.endsWith(".tgz")){
                const _port = require(process.cwd()+"/public/server/"+_curr+"/ado.config.js")
                console.log('_port',_port);
                let _item = {port:_port,server:_curr}
                _list.push(_item)
            }
        }
        return _list
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
            let run_cmd = `cd ${get_dir} &&  npm run preview`;
            console.log('run_cmd',run_cmd);
            
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
        console.log("执行");
        
        const std = spawn(
          `cd public/server/AdoNodeTestServer && npm run preview`,
          {
            stdio: "pipe",
            shell: true,
            env: process.env,
          }
        );

        std.stdout.on("data", function (chunk) {
            console.log('写入',chunk.toString());
        })
        
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
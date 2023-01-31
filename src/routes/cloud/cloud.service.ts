import { Collect, Inject } from "ado-node";
import { cloud } from "./cloud.entity";
import { spawn, exec } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync } from 'fs'
import { get_port_status, timeout } from "../../utils";
import path from "node:path";
import yaml from 'yaml';

@Collect()
export class cloudService {
    @Inject(cloud)
    Cloud!: cloud


    run(uu_id: string) {
        return uu_id
    }

    list() {
        let _list: any[] = []
        let _dir = readdirSync("public/server")
        for (let i = 0; i < _dir.length; i++) {
            let _curr = _dir[i]
            if (!_curr.endsWith(".tgz")) {
                const _port = require(process.cwd() + "/public/server/" + _curr + "/ado.config.js")
                console.log('_port', _port);
                let _item = { port: _port, server: _curr }
                _list.push(_item)
            }
        }
        return _list
    }


    run_upload(file_path: string) {
        return new Promise(async (resolve, reject) => {
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
            console.log('run_cmd', run_cmd);
            this.run_server_cmd(run_cmd)
            resolve(true);
        })
    }

    run_server_cmd(cmd:string) {
        let c_process = spawn(cmd, {
            stdio: "pipe",
            shell: true,
            env: process.env,
        });
        c_process.stderr.on("data", function (chunk) {
            console.log("错误", chunk);
        });
        c_process.stdout.on("data", function (chunk) {
            console.log("服务日志", chunk.toString());
        });
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

    restart(server_name: string) {
        const server = this.list().find(el => el.server == server_name)
        if (server) {
            let run_cmd = `cd public/server/${server_name} &&  npm run preview`;
            console.log("run_cmd", run_cmd);

            this.run_server_cmd(run_cmd)
            return true
        } else {
            return false
        }

    }

    async kill(port: number) {
        const port_or_false: number = await this.get_port_status(port) as number;
        if (port_or_false && !isNaN(port_or_false)) {
            let kill_cmd = "kill -9 " + port_or_false;
            exec(kill_cmd);
            return true
        }
        return false
    }

    async get_port_status(port: number): Promise<any> {
        try {
            const data = await Promise.race([get_port_status(port), timeout()]) as number;
            return data;
        } catch (e) {
            return false
        }
    }

    GetRpcMethods(){
        let cwd = process.cwd()
        let method_path = path.resolve(cwd,'public/server','AdoRpcProject/rpc/interface',"Hello.yaml")
        const ctx = readFileSync(method_path, "utf-8")
        const content = yaml.parse(ctx)
        return content
    }
}
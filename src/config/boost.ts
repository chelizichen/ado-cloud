import { readFileSync } from "fs";
import path from 'path';
import { ArcProxy } from "./proxy";
import { nextTick } from "process";

function boost() {
  // 读取JSON
  let cwd = process.cwd();
  let config_path = path.resolve(cwd, 'cloud.json')
  const config = JSON.parse(readFileSync(config_path, 'utf-8'))

  // 启动已有微服务

  // 链接微服务
  nextTick(() => {
    let microServiceS = new Map<string, any>();
    config.servant.forEach((net: any) => {
      let proxy_instance = new ArcProxy(net.host, parseInt(net.port));
      const { key, socket } = proxy_instance;
      microServiceS.set(key, socket);
    });
  })

  // 发现微服务方法
}
export {
  boost
}
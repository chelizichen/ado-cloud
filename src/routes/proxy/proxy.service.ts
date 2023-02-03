import { readFileSync } from "fs";
import path from "path";
import { server_list, server_restart, get_micro_service } from "../../api/cloud";
import { ArcProxy } from "../../config/proxy";
import { nextTick } from "node:process";
import { call } from "../../config/utils";

export class proxyService {
  static async transmit(body: any) {
    const { key } = body;
    
    let Arc_ProxyInstance = proxyService.MicroServices.get(key);

    if (Arc_ProxyInstance) {
      const buf = call(body)
      const data = await Arc_ProxyInstance.write(buf);
      return data;
    } else {
      return 0;
    }
  }

  static MicroServices: Map<string, ArcProxy>;

  static async boost() {
    // 读取JSON

    // 启动已有微服务
    // await proxyService.micro_service_start();

    await proxyService.link_service();
    // 链接微服务
    // 发现微服务方法
  }

  static async micro_service_start() {
    const data = await server_list();
    data.data.forEach(async (el: any) => {
      await server_restart({ server_name: el.server });
      const data = await get_micro_service({ server_name: el.server });
      // 微服务做特殊处理
      if (data.data.message == "MicroService") {
        console.log("data", el.server, data);
      }
    });
  }

  static async link_service() {
    let cwd = process.cwd();
    let config_path = path.resolve(cwd, "cloud.json");
    const config = JSON.parse(readFileSync(config_path, "utf-8"));
    nextTick(() => {
      proxyService.MicroServices = new Map<string, ArcProxy>();
      config.servant.forEach((net: any) => {
        let proxy_instance = new ArcProxy(net.host, parseInt(net.port));
        const { key } = proxy_instance;
        console.log(key);
        proxyService.MicroServices.set(key, proxy_instance);
      });
    });
  }

  static async log() {
    // @ts-ignore
    let proxy_instance = new ArcProxy("127.0.0.1", parseInt("10012"));
  }
}
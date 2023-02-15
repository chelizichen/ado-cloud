import { AdoNodeController, Controller, Post, Get, Body } from "ado-node";
import { proxyService } from './proxy.service';

// 微服务网关层

@Controller("/proxy")
export class proxyController extends AdoNodeController {

  // 拦截所有数据并转发

  @Post("/interceptor")
  async interceptor(@Body() body: {
    interFace: string,
    method: string,
    data: any,
    timeout: string,
    key:string
  }) {
    console.log(body);
    body.data['ArcData'] = "End"
    console.log('body.data',body.data);
    
    let data = await proxyService.transmit(body) as Buffer
    let _tostr_ = data.toString()
    return {
      msg: "ProxySide",
      code: 0,
      data: _tostr_,
    };
  }

  @Get("/start_service")
  async start_service() {
    proxyService.boost()
    return
  }

  @Get("/test")
  async test() {
    return {
      code: 0,
      message:"测试成功远端Http 服务"
    }
  }
}
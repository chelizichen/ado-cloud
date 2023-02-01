import { AdoNodeController, Body, Controller, Get, Inject, Post, Query, Req } from "ado-node";
import { ret } from "../../config/ret";
// import { QueryId } from "../../types";
import { cloud } from "./cloud.entity";
import { cloudService } from './cloud.service';
import { serverService } from '../server/server.service';

@Controller("/cloud")
export class cloudController extends AdoNodeController {
  @Inject(cloudService)
  cloudService!: cloudService;

  @Inject(serverService)
  ServerService!: serverService;


  @Get("/list")
  async list() {
    const data = await this.cloudService.list();
    return ret.success(data);
  }

  @Post("/upload")
  async upload(@Req() req: any, @Body() body: any) {
    const { name,  } = body;
    console.log("body !!!!!!!!!", body);

    const file_path = `public/server/${name}`;
    try {
      await this.cloudService.create_ws(
        file_path,
        req.files[0].buffer
      );
      const is_run = await this.cloudService.run_upload(file_path);
      return ret.success(is_run);
    } catch (e) {
      return ret.success(false);
    }
  }

  @Post("/update")
  update(@Body() _body: cloud) {
    // this.cloudService.update();
    return ret.success("成功");
  }

  @Get("/restart")
  async restart(@Query() query: any) {
    const server_name = query.server_name;
    const data = await this.cloudService.restart(server_name);
    return ret.success(data);
  }

  @Get("/kill")
  async kill(@Query() query: any) {
    const port = query.port;
    const data = await this.cloudService.kill(port);
    return ret.success(data);
  }

  // 根据端口号得到相关信息
  @Get("/port_status")
  async get_port_status(@Query() query: any) {
    const port = query.port;
    let data = await this.cloudService.get_port_status(port);
    if (typeof data == "string") {
      // @ts-ignore
      data = data.replace(/\r|\n/gi, "");
    }
    return ret.success(data);
  }

  @Get("/tgz_list")
  async get_tgz_list() {
    
  }

  @Get("/get_micro_service")
  public getMicroService(@Query() query: {server_name:string}) {
    const { server_name } = query;
    let list = this.cloudService.GetRpcMethods(server_name);
    return ret.success(list)
  }
}
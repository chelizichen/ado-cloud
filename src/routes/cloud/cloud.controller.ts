import { AdoNodeController, Body, Controller, Get, Inject, Post, Query, Req } from "ado-node";
import { writeFileSync } from "fs";
import { ret } from "../../config/ret";
import { QueryId } from "../../types";
import { cloud } from "./cloud.entity";
import { cloudService } from './cloud.service';

@Controller("/cloud")
export class cloudController extends AdoNodeController {
  @Inject(cloudService)
  cloudService!: cloudService;

  @Get("/list")
  async list() {
    const data = await this.cloudService.list();
    return ret.success(data);
  }

  @Get("/run")
  async run(@Query() query: QueryId) {
    const data = await this.cloudService.run(query.id);
    return ret.success(data);
  }

  @Post("/upload")
  async upload(@Req() req: any, @Body() body: any) {
    const { desc, name } = body;
    console.log(desc);
    const file_path = `public/server/${name}`;
    writeFileSync(file_path, req.files[0].buffer);
    try {
      const is_run = await this.cloudService.run_upload(file_path);
      return ret.success(is_run);
    } catch (e) {
      return ret.success(false);
    }
  }

  @Post("/update")
  update(@Body() _body: cloud) {
    this.cloudService.update();
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
}
import { Server_Info } from "./cloud.enity";
import {
  Controller,
  AdoNodeController,
  Inject,
  Get,
  Post,
  Req,
  Body,
  Query,
} from "ado-node";
import { CloudService } from "./cloud.service";
// import express, { Express } from "express";

@Controller("/cloud")
export class CloudController extends AdoNodeController {
  @Inject(CloudService)
  CloudService!: CloudService;

  @Get("/stats_list")
  public async getStatsList() {
    this.CloudService.getRedisStats();
    return {
      msg: "ok",
      code: 0,
    };
  }

  @Get("/stats_servername")
  public async getStatsByServerName(@Query() query: any) {
    const { serverName } = query;
    const data = await this.CloudService.getStatsByServerName(serverName);
    return {
      msg: "ok",
      data,
      code: 0,
    };
  }
  @Get("/file_list") // 目录下所含有的文件
  public async getFileList() {
    const data = await this.CloudService.getFileList();
    return {
      data,
      msg: "ok",
      code: 0,
    };
  }

  @Get("/server_list")
  public async getServersList() {
    const data = await this.CloudService.getServerList();
    return {
      data,
      msg: "ok",
      code: 0,
    };
  }

  @Post("/upload")
  public async upload(@Req() req: any, @Body() body: any) {
    const { originalname, path, size } = req.files[0];
    const { desc, port } = body;

    const { name_tgz, name_dir, server_path } =
      (await this.CloudService.re_name(path, originalname)) as any;

    const data = await this.CloudService.upload(name_tgz, name_dir);

    const inst = new Server_Info();
    inst.path = server_path;
    inst.port = port;
    inst.desc = desc;
    inst.size = size;
    inst.serverName = name_dir;
    this.CloudService.saveServer(inst);

    return {
      data,
      msg: "文件上传成功",
      code: 0,
    };
  }
}

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

// 从Redis 获得所有服务PID
// 用 PID 获得状态
// 从数据库获得所有历史服务
//

@Controller("/cloud")
export class CloudController extends AdoNodeController {
  @Inject(CloudService)
  CloudService!: CloudService;

  @Get("/port_list")
  public async getPortList() {
    const data = await this.CloudService.getPortList();
    return {
      code: 0,
      msg: "ok",
      data,
    };
  }

  @Get("/stats_pid")
  public async getStatsByPid(@Query() query: any) {
    const { pid, serverName } = query;
    try {
      const data = await this.CloudService.getPidStats(pid);
      return {
        msg: "ok",
        code: 0,
        data: {
          serverName,
          alive: data,
        },
      };
    } catch (e) {
      return {
        msg: "err",
        code: -1,
        data: {
          alive: false,
          serverName,
        },
      };
    }
  }

  @Get("/stats_restart")
  public async restartServer(@Query() query: any) {
    const { serverName } = query;
    const data = await this.CloudService.statsRestart(serverName);
    return {
      msg: "ok",
      code: 0,
      data,
    };
  }

  @Get("/stats_shutdown")
  public async shutdownServer(@Query() query: any) {
    const { serverName } = query;
    const data = await this.CloudService.statsShutDown(serverName);
    return {
      msg: "ok",
      code: 0,
      data,
    };
  }
  @Get("/stats_list")
  public async getStatsList() {
    const data = await this.CloudService.getStatsList();
    return {
      msg: "ok",
      code: 0,
      data,
    };
  }

  @Get("/stats_servername")
  public async getStatsByServerName(@Query() query: any) {
    const { serverName } = query;
    try {
      const data = await this.CloudService.getStatsByServerName(serverName);
      return {
        msg: "ok",
        alive: data,
        code: 0,
      };
    } catch (e) {
      return {
        msg: "error",
        alive: false,
        code: -1,
      };
    }
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
    const data = await this.CloudService.getServerList_Redis();
    return {
      data,
      msg: "ok",
      code: 0,
    };
  }

  @Post("/server_upload")
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

  @Get("/server_list_db")
  public async getServerList_Db() {
    const data = await this.CloudService.getServerList_Db();
    return {
      data,
      msg: "ok",
      code: 0,
    };
  }
}

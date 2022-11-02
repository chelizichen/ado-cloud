import { AdoNodeController, Controller, Get, Inject, Query } from "ado-node";
import { LogService } from "./log.service";
@Controller("/log")
export class LogController extends AdoNodeController {
  @Inject(LogService)
  LogService!: LogService;

  @Get("/serverName")
  public async getLogByServerName(@Query() query: { serverName: string }) {
    const { serverName } = query;
    const data = await this.LogService.getLog_ServerName(serverName);
    return {
      data,
      msg: "ok",
      code: 0,
    };
  }
}

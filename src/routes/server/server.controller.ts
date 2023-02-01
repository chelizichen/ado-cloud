import { AdoNodeController,Body,Controller,Get,Inject, Post, Query } from "ado-node";
import { serverService } from './server.service';
import { ret } from "../../config/ret";

@Controller("/server")
export class serverController extends AdoNodeController{
  @Inject(serverService)
  serverService!: serverService
  

  @Get("/link_server")
  async get_link_server(@Query() query: { server_name: string }) {
    const { server_name } = query
    const data = await this.serverService.getLinkServer(server_name);
    return ret.success(data)
  }

  @Post("/update")
  async update(@Body() body:any) {
    const data = await this.serverService.update(body)
    return ret.success(data)
  }

}
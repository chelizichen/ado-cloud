import { AdoNodeController, Body, Controller, Get, Inject, Post, Query, Req } from "ado-node";
import { writeFileSync } from "fs";
import { ret } from "../../config/ret";
import { QueryId } from "../../types";
import { cloud } from "./cloud.entity";
import { cloudService } from './cloud.service';

@Controller("/cloud")
export class cloudController extends AdoNodeController {
  @Inject(cloudService)
  cloudService!: cloudService

  @Get("/test")
  hello() {
    return {
      msg: "ok",
      code: 0,
      data: "hello world"
    }
  }


  @Get("/run")
  async run(@Query() query: QueryId) {
    const data = await this.cloudService.run(query.id)
    return ret.success(data)
  }

  @Post("/upload")
  async upload(@Req() req: any, @Body() body: any) {
    const { desc, name } = body
    console.log(desc);
    const file_path = `public/server/${name}`
    // 测试上传
    writeFileSync(file_path, req.files[0].buffer);
    try {
      const is_run = await this.cloudService.run_upload(file_path)
      return ret.success(is_run);
    } catch (e) {
      return ret.success(false)
    }
  }


  @Post("/update")
  update(@Body() _body: cloud) {
    this.cloudService.update()
    return ret.success("成功")
  }


}
import {
  Controller,
  AdoNodeController,
  Inject,
  Get,
  Post,
  Req,
} from "ado-node";
import { CloudService } from "./cloud.service";
// import express, { Express } from "express";

@Controller("/cloud")
export class CloudController extends AdoNodeController {
  @Inject(CloudService)
  CloudService!: CloudService;

  @Get("/list")
  public async getFileList() {
    const data = await this.CloudService.getFilesList();
    return {
      data,
      msg: "ok",
      code: 0,
    };
  }

  // @Get("/decompression")
  // public async deCompression(@Query() query: any) {
  //   console.log(query);
  //   // await 阻塞响应
  //   const data = await this.FilesService.getFilesList("test");
  //   return {
  //     data,
  //     msg: "ok",
  //     code: 0,
  //   };
  // }

  // 文件改名 sudo mv fileName newFilename
  @Post("/upload")
  public async upload(@Req() req: any) {
    const { originalname, filename } = req.files[0];
    console.log(req.files[0]);

    // console.log(filename);

    const data = await this.CloudService.upload(filename, originalname);
    return {
      data,
      msg: "文件上传成功",
      code: 0,
    };
  }
}

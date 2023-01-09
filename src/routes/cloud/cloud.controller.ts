import { AdoNodeController,Body,Controller,Get,Inject, Post, Query, Req } from "ado-node";
import { ret } from "../../config/ret";
import { QueryId } from "../../types";
import { cloud } from "./cloud.entity";
import { cloudService } from './cloud.service';

@Controller("/cloud")
export class cloudController extends AdoNodeController{
  @Inject(cloudService)
  cloudService!: cloudService
  
  @Get("/test")
  hello() {
    return {
      msg:"ok",
      code:0,
      data:"hello world"
    }
  }
  

  @Get("/run")
  async run(@Query() query:QueryId){
    const data = await this.cloudService.run(query.id)
    return ret.success(data)
  }

  @Post("/upload")
  async upload(@Req() req: any, @Body() body: any){
    console.log('req',req.files);
    console.log("body",body);


    return ret.success("ok")
  }


  @Get("/update")
  update(@Body() body:cloud){
    return body
  }


}
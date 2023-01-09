import { AdoNodeController,Controller,Get,Inject } from "ado-node";
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

}
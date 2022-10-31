import {
  Controller,
  AdoNodeController,
  Inject,
  UseCache,
  Get,
  CODE,
  UsePipe,
  Query,
} from "ado-node";
import { RedisClientType } from "redis";
import { CONSTANT } from "../../config/constant";
import { UserIdPipe } from "./user.pipe";
import { UserService } from "./user.service";
@Controller("/user")
class UserController extends AdoNodeController {
  @Inject(UserService)
  UserService!: UserService;
  @UseCache(CONSTANT.REDIS)
  Redis!: RedisClientType;

  @UsePipe(new UserIdPipe())
  @Get("/getUser")
  async getUser(@Query() query: any) {
    return {
      data: query.id,
      code: CODE.SUCCESS,
    };
  }

  @Get("/hello")
  async hello() {
    return await {
      message: "AdoNode-SSR-React",
    };
  }
  @Get("/author")
  async author() {
    return await {
      author: "chelizichen",
    };
  }

  @Get("/list")
  async getList() {
    return await this.UserService.List();
  }
}

export { UserController };

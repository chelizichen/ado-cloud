import {
  AdoNodeController,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from "ado-node";
import { ENITY } from "./enity.enity";
import { queryId } from "./enity.type";

@Controller("/code")
export class EnityController extends AdoNodeController {
  @Get("/enity/list")
  public async getEnitylist(@Query() query: queryId) {}
  @Post("/enity/add")
  public async addEnity(@Body() body: ENITY) {}
  @Get("/enity/del")
  public async delEnity(@Query() query: queryId) {}

  @Get("/enity/code/update")
  public async addEnityCode() {}
  @Get("/enity/code/get")
  public async getEnityCode() {}
  @Post("/enity/code/del")
  public async delEnityCode() {}
}

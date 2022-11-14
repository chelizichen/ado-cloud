import {
  AdoOrmBaseEnity,
  AutoCreate,
  Collect,
  Enity,
  IsNumber,
  Key,
} from "ado-node";
import { CONSTANT } from "../../../config/constant";

@Enity(CONSTANT.MYSQL)
@Collect()
export class ENITY extends AdoOrmBaseEnity {
  @Key
  @IsNumber
  id!: string;

  enity_name!: string;

  @AutoCreate
  createTime!: string;
}

@Enity(CONSTANT.MYSQL)
@Collect()
export class ENITYCODE extends AdoOrmBaseEnity {}

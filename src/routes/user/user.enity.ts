import {
  AdoOrmBaseEnity,
  AutoCreate,
  Collect,
  Enity,
  IsEmail,
  IsNumber,
  Key,
  Keyword,
} from "ado-node";
import { CONSTANT } from "../../config/constant";

@Enity(CONSTANT.MYSQL)
@Collect()
export class USER_INFO extends AdoOrmBaseEnity {
  @Key
  id!: number;

  @IsEmail
  email!: number;

  @Keyword
  username!: string;

  password!: string;

  @IsNumber
  phone!: number;

  @AutoCreate
  createTime!: string;
}

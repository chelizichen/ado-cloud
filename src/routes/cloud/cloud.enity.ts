import {
  AdoOrmBaseEnity,
  AutoCreate,
  Collect,
  Enity,
  Key,
  Keyword,
} from "ado-node";
import { CONSTANT } from "../../config/constant";

// fieldname: 'file',
// originalname: 'AdoTest3003Server.tgz',
// encoding: '7bit',
// mimetype: 'application/gzip',
// destination: 'public/server',
// filename: '25fdd002ed3df2a286606084b24cc000',
// path: 'public/server/25fdd002ed3df2a286606084b24cc000',
// size: 151285760

@Enity(CONSTANT.MYSQL)
@Collect()
export class Server_Info extends AdoOrmBaseEnity {
  @Key
  id!: number; // id

  @Keyword
  desc!: string; // 服务描述信息

  port!: number; // 端口

  serverName!: string; // 服务名称

  size!: number;

  path!: string;

  @AutoCreate
  createTime!: string; // 服务创建时间
  //ALTER TABLE `boot`.`goods` MODIFY COLUMN `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间' ;
}

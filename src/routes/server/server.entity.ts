import { AdoOrmBaseEntity, AutoCreate, Entity, Key, Keyword } from "ado-node";

@Entity("server")
export class server extends AdoOrmBaseEntity {
  @Key
  id!: string;

  server_pkg!: string;

  @Keyword
  server_name!: string;

  server_type!: string; // 1 http 2 microService

  link_server_id!: string;

  server_desc!: string;

  @AutoCreate
  createTIme!: string;
}

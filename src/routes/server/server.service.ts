import { Collect, Inject } from "ado-node";
import { server } from './server.entity';

@Collect()
export class serverService {

  async update(body: any) {
    const data = await this.Server.save(body);
    return data;
  }

  @Inject(server)
  Server!: server;

  async getLinkServer(server_name: string) {
    const master_server = await this.Server.getBy({
      server_pkg: server_name,
    });
    const link_id = master_server[0].id;

    const link_server = await this.Server.getBy({
      link_server_id: link_id,
    });
    return {
      master_server,
      link_server,
    };
  }
}
import { Module } from "ado-node";
import { cloudController } from './cloud.controller'
import { serverModule } from '../server/server.module';

@Module({
  Controller:[cloudController],
  Provider:[serverModule]
})
export class cloudModule{}
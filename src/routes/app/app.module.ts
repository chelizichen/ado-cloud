import { Module } from "ado-node";
import { cloudModule } from "../cloud/cloud.module";
import { appController } from './app.controller'
import { proxyModule } from "../proxy/proxy.module";

@Module({
  Controller:[appController],
  Provider:[cloudModule,proxyModule]
})
export class appModule{}
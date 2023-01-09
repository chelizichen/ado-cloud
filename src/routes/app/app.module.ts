import { Module } from "ado-node";
import { cloudModule } from "../cloud/cloud.module";
import { appController } from './app.controller'

@Module({
  Controller:[appController],
  Provider:[cloudModule]
})
export class appModule{}
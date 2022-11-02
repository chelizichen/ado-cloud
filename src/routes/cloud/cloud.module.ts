import { LogModule } from "./../log/log.module";
import { Module } from "ado-node";
import { CloudController } from "./cloud.controller";

@Module({
  Controller: [CloudController],
  Provider: [LogModule],
})
export class CloudModule {}

import { Module } from "ado-node";
import { CloudController } from "./cloud.controller";

@Module({
  Controller: [CloudController],
  Provider: [],
})
export class CloudModule {}

import { LogController } from "./log.controller";
import { Module } from "ado-node";

@Module({
  Controller: [LogController],
  Provider: [],
})
export class LogModule {}

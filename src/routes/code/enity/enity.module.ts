import { EnityController } from "./enity.controller";
import { Module } from "ado-node";

@Module({
  Controller: [EnityController],
  Provider: [],
})
export class EnityModule {}

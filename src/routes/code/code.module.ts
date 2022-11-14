import { EnityModule } from "./enity/enity.module";

import { Module } from "ado-node";

@Module({
  Controller: [],
  Provider: [EnityModule],
})
export class CodeModule {}

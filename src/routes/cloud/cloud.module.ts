import { Module } from "ado-node";
import { cloudController } from './cloud.controller'

@Module({
  Controller:[cloudController],
  Provider:[]
})
export class cloudModule{}
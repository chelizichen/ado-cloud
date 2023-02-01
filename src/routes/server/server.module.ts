import { Module } from "ado-node";
import { serverController } from './server.controller'

@Module({
  Controller:[serverController],
  Provider:[]
})
export class serverModule{}
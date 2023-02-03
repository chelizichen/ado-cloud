import { Module } from "ado-node";
import { proxyController } from './proxy.controller'

@Module({
  Controller:[proxyController],
  Provider:[]
})
export class proxyModule{}
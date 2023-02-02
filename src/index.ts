import { AdoNodeServer, Modules } from "ado-node";
import express, { Express } from "express";
import path from "path";
import cors from "cors";
import { appModule } from "./routes/app/app.module";
import { LogGlobalPipe } from "./pipe/Log.pipe";
import multer from "multer";
import { ws_server_controller } from "./ws/server.controller";
import { boost } from "./config/boost";
@Modules({
  Modules: [appModule],
  GlobalPipes: [LogGlobalPipe],
})
class AdoNodeServerImpl extends AdoNodeServer {}

AdoNodeServerImpl.runSSRServer((app: Express) => {

  ws_server_controller(app);
  
  boost()

  app.use(express.static("dist/app"));
  app.use("/cloudserver",express.static("public/server"))
  app.use(cors());
  app.use(multer({ dest: "public/server" }).any());
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "app/index.html"));
  });


});

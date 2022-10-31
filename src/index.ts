import { LogPipe } from "./pipe/LogPipe";
import { AdoNodeConfig, AdoNodeServer, Modules } from "ado-node";
import { CommonClass } from "./config/common";
import express, { Express } from "express";
import path from "path";
import { UserModule } from "./routes/user/user.module";
import { CloudModule } from "./routes/cloud/cloud.module";
import cors from "cors";
@AdoNodeConfig(CommonClass)
@Modules({
  Modules: [UserModule, CloudModule],
  Base: "/api",
  Port: 3001,
  GlobalPipes: [LogPipe],
})
class AdoNodeServerImpl extends AdoNodeServer {}

AdoNodeServerImpl.runSSRServer((app: Express) => {
  app.use(express.static("dist/app"));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "app/index.html"));
  });
  app.use(cors());
  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
});
// AdoNodeServerImpl.;

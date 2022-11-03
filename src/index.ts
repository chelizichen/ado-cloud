import { LogPipe } from "./pipe/LogPipe";
import { AdoNodeConfig, AdoNodeServer, Modules } from "ado-node";
import { CommonClass } from "./config/common";
import express, { Express } from "express";
import path from "path";
import { UserModule } from "./routes/user/user.module";
import { CloudModule } from "./routes/cloud/cloud.module";
import cors from "cors";
import ws from "express-ws";
import { Event } from "./config/common";
@AdoNodeConfig(CommonClass)
@Modules({
  Modules: [UserModule, CloudModule],
  Base: "/api",
  Port: 3001,
  GlobalPipes: [LogPipe],
})
class AdoNodeServerImpl extends AdoNodeServer {}

AdoNodeServerImpl.runSSRServer((app: Express) => {
  ws(app);
  // @ts-ignore
  app.ws("/api/ws/:serverName", function (ws, req) {
    console.log("ws 连接成功");
    console.log("req.params", req.params.serverName);
    const { serverName } = req.params;

    Event.on(`${serverName}:ws`, function (msg) {
      ws.send(msg);
    });
    Event.emit(
      `${serverName}:ws`,
      `${new Date()} connect to express server with WebSocket success \n`
    );
    // 使用 on 方法监听事件
    //   message 事件表示从另一段（服务端）传入的数据
    ws.on("message", function (msg: string) {
      console.log(`receive message ${msg}`);
      ws.send("default response");
    });

    // 设置定时发送消息

    // close 事件表示客户端断开连接时执行的回调函数
    ws.on("close", function (_e: any) {
      console.log("close connection");
    });
  });

  app.use(express.static("dist/app"));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "app/index.html"));
  });
  app.use(cors());
  app.use("/AdoServer", express.static(path.join(__dirname, "../public")));
});
// AdoNodeServerImpl.;

import ws from "express-ws";

export function ws_server_controller(app: any) {
  ws(app);
  app.ws("/api/ws/:serverName", function (ws: any, req: any) {
    console.log("ws 连接成功");
    console.log("req.params", req.params.serverName);
    // const { serverName } = req.params;

    // Event.on(`${serverName}:ws`, function (msg: any) {
    //   ws.send(msg);
    // });
    // Event.emit(
    //   `${serverName}:ws`,
    //   `${new Date()} connect to express server with WebSocket success \n`
    // );
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
}

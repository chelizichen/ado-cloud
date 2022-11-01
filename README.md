# @Ado/Cloud 

从[TAF/Tars](https://github.com/TarsCloud/Tars)平台获得的灵感，并且使用[@Ado/Node](https://github.com/chelizichen/ado-node)进行底层的构建，集成 **测试 日志监控 打包 发布 回滚** 等服务。

- 打包命令 需要自定义 .tgz 的名字
````
    "tar": "npm run build & tar -cvf AdoTestServer.tgz ./dist package.json node_modules"
````

- 11.1 输出日志初版
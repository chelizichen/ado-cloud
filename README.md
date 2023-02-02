# @Ado/Cloud 

从[TAF/Tars](https://github.com/TarsCloud/Tars)平台获得的灵感，并且使用[@Ado/Node](https://github.com/chelizichen/ado-node)进行底层的构建，集成 **测试 日志监控 打包 发布 回滚** 等服务。

- 打包命令 需要自定义 .tgz 的名字

````json
    "tar": "npm run build & tar -cvf AdoTestServer.tgz ./dist package.json node_modules"
````

- 11.1 输出日志初版

- 2.2 微服务架构调整

````txt
1、 去中心化 将原来点对点的微服务改为事件代理的模式
2、 关联服务只需要注册即可，由云服务平台发现服务
3、 由云服务平台实现统一负载均衡
````

流程

````txt
1、 注册 关联微服务、得到关联的相关配置文件
2、 云服务平台 与 关联 微服务 点对点 连接
3、 云服务平台 发现 关联微服务事件 并且代理事件
4、 客户端 通过云服务平台 发现相关微服务
5、 云服务平台 代理转发 消费 关联微服务事件
````

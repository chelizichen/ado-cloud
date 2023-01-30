/**
 * @description 事件假委托给云服务平台
 * @desc 在云服务平台使用负载均衡
 */

type relevance_interface_method = {
    name:string,
    req:string,
    res:string
}

type relevance_interface ={
    name:string,
    methods:relevance_interface_method[]
}

type relevance = {
    host:string,
    port:string,
    desc:string,
    interfaces:relevance_interface[]
}

let server_all:relevance[] = [
    {
        host:"127.0.0.1",
        port:"9000",
        desc:"用户集微服务",
        interfaces:[
            {
                name:"UserInterFace",
                methods:[
                    {
                        name:"getList",
                        req:"getListRequest",
                        res:"getListResponse"
                    },
                    {
                        name:"del",
                        req:"delRequest",
                        res:"delResponse"
                    }
                ]
            }
        ]
    },
    {
        host:"127.0.0.1",
        port:"10012",
        desc:"视频集微服务",
        interfaces:[
            {
                name:"VedioInterFace",
                methods:[
                    {
                        name:"getList",
                        req:"getListRequest",
                        res:"getListResponse"
                    },
                    {
                        name:"del",
                        req:"delRequest",
                        res:"delResponse"
                    }
                ]
            }
        ]
    }
]

export {
    server_all
}
export type{
    relevance
}
import request from "@/utils/axios";

export function list() {
  return request({
    url: "cloud/list",
    method: "get",
  });
}


export function port_status(params:{port:string}) {
  return request({
    url: "cloud/port_status",
    method: "get",
    params
  });
}

export function server_restart(params: { server_name: string }) {
  return request({
    url: "cloud/restart",
    method: "get",
    params,
  });
}

export function server_kill(params: { port: string }) {
  return request({
    url: "cloud/kill",
    method: "get",
    params,
  });
}


export function test(){
  return request({
    url: "cloud/update",
    method: "post",
  });
}
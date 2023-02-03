import request from "../utils/request";

export function server_list() {
  return request({
    url: "cloud/list"
  });
}


export function server_restart(params: {
  server_name:string
}) {
  return request({
    url: "cloud/restart",
    params,
  });
}

export function get_micro_service(params: {
  server_name:string
}) {
  return request({
    url: "cloud/get_micro_service",
    params
  });
}
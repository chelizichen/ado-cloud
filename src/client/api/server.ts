import request from "@/utils/axios";

export function link_server(params: { server_name: string }) {
  return request({
    url: "server/link_server",
    method: "get",
    params,
  });
}

export function get_micro_service(params: { server_name: string }) {
    return request({
      url: "cloud/get_micro_service",
      method: "get",
      params,
    });
}

export function update(data: any) {
  return request({
    url: "server/update",
    method: "post",
    data,
  });
}
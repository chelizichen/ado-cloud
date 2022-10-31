import request from "@/utils/axios";

export function file_list() {
  return request({
    url: "/api/cloud/file_list",
    method: "get",
  });
}

export function server_list() {
  return request({
    url: "/api/cloud/server_list",
    method: "get",
  });
}

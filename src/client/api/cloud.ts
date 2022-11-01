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

export function stats_list() {
  return request({
    url: "/api/cloud/stats_list",
    method: "get",
  });
}

export function stats_servername(params: any) {
  return request({
    url: "/api/cloud/stats_servername",
    method: "get",
    params,
  });
}

export function stats_pid(params: any) {
  return request({
    url: "/api/cloud/stats_pid",
    method: "get",
    params,
  });
}

export function stats_restart(params: any) {
  return request({
    url: "/api/cloud/stats_restart",
    method: "get",
    params,
  });
}

export function stats_shutdown(params: any) {
  return request({
    url: "/api/cloud/stats_shutdown",
    method: "get",
    params,
  });
}

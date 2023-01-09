import request from "@/utils/axios";

export function list() {
  return request({
    url: "/api/cloud/list",
    method: "get",
  });
}

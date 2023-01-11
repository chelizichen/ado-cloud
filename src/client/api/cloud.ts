import request from "@/utils/axios";

export function list() {
  return request({
    url: "cloud/list",
    method: "get",
  });
}


export function test(){
  return request({
    url: "cloud/update",
    method: "post",
  });
}
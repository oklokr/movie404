import request from "@/utils/request"

export function mypageLoginInfo(data) {
  return request({
    url: "/api/login",
    method: "post",
    data,
  })
}

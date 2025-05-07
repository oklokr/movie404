import request from "@/utils/request"

export function mypageLoginInfo(data) {
  console.log("test")
  return request({
    url: "/api/login",
    method: "post",
    data,
  })
}

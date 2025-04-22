import request from "@/utils/request"

export function mypageLoginInfo(data) {
  return request({
    url: "/web/v1/mypage/login/info",
    method: "post",
    data,
  })
}

export function mypageLoginManual(data) {
  return request({
    url: "/web/v1/mypage/login/manual",
    method: "post",
    data,
  })
}

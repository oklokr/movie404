import request from "@/utils/request"

export function commonGetUserInfo(data) {
  return request({
    url: "/api/common/userInfo",
    method: "post",
    data,
  })
}

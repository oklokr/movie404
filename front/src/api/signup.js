import request from "@/utils/request"

export function signupCheckId(data) {
  return request({
    url: "/api/signup",
    method: "post",
    data,
  })
}

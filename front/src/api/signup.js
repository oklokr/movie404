import request from "@/utils/request"

export function signupCheckId(data) {
  return request({
    url: "/api/checkId",
    method: "post",
    data,
  })
}

export function signupCheckEmail(data) {
  return request({
    url: "api/checkEmail",
    method: "post",
    data,
  })
}

export function sendAuthEmail(data) {
  return request({
    url: "api/authEmail",
    method: "post",
    data,
  })
}

export function insertUser(data) {
  return request({
    url: "api/insertUser",
    method: "post",
    data,
  })
}

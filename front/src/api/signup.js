import request from "@/utils/request"

export function signupCheckId(data) {
  return request({
    url: "/api/signup/checkId",
    method: "post",
    data,
  })
}

export function signupCheckEmail(data) {
  return request({
    url: "/api/signup/checkEmail",
    method: "post",
    data,
  })
}

export function sendAuthEmail(data) {
  return request({
    url: "/api/signup/authEmail",
    method: "post",
    data,
  })
}

export function insertUser(data) {
  return request({
    url: "/api/signup/insertUser",
    method: "post",
    data,
  })
}

export function login(data) {
  return request({
    url: "/api/signup/login",
    method: "post",
    data,
  })
}

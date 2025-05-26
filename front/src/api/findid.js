import request from "@/utils/request"

export function selectIdbyEmail(data) {
  return request({
    url: "/api/find/findid",
    method: "post",
    data,
  })
}

export function selectIdbyTel(data) {
  return request({
    url: "/api/find/findidbyTel",
    method: "post",
    data,
  })
}

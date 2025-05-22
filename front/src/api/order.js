import request from "@/utils/request"

export function orderCreateId(data) {
  return request({
    url: "/api/order/create",
    method: "post",
    data,
  })
}
export function orderValidate(data) {
  return request({
    url: "/api/order/validate",
    method: "post",
    data,
  })
}

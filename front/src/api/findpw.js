import request from "@/utils/request"

export function checkUserByIdEmail(data) {
  return request({
    url: "/api/find/findpw",
    method: "post",
    data,
  })
}

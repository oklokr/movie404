import request from "@/utils/request"

export function checkUserByIdEmail(data) {
  return request({
    url: "/api/findpw",
    method: "post",
    data,
  })
}

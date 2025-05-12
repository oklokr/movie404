import request from "@/utils/request"

export function selectIdbyEmail(data) {
  return request({
    url: "/api/findid",
    method: "post",
    data,
  })
}

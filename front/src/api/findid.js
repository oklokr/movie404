import request from "@/utils/request"

export function selectIdbyEmail(data) {
  return request({
    url: "/api/find/findid",
    method: "post",
    data,
  })
}

import request from "@/utils/request"

// 회원 목록 조회
export function fetchUserList() {
  return request({
    url: "/admin/user",
    method: "get",
  }).then((res) => res) // ★ res.data 아님!
}

// 회원 상세 조회
export function fetchUserDetail(id) {
  return request({
    url: `/admin/user/${id}`,
    method: "get",
  }).then((res) => res) // ★ res.data 아님!
}

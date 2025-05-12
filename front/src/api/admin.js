import request from "@/utils/request"

// 회원 목록 조회
export function fetchUserList() {
  return request({
    url: "/api/admin/users",
    method: "get",
  }).then((res) => res.data.data)
}

// 회원 상세 조회
export function fetchUserDetail(id) {
  return request({
    url: `/api/admin/users/${id}`,
    method: "get",
  }).then((res) => res.data.data)
}

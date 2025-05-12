import request from "@/utils/request"

// 회원 목록 조회
export function fetchUserList() {
  return request({
    url: "/admin/user",
    method: "get",
  }).then((res) => res)
}

// 회원 상세 조회
export function fetchUserDetail(id) {
  return request({
    url: `/admin/user/${id}`,
    method: "get",
  }).then((res) => res)
}

// 회원 비밀번호 초기화 (비밀번호를 1234로 변경)
export function resetUserPassword(id) {
  return request({
    url: `/admin/user/${id}/reset-password`,
    method: "post",
    data: { password: "1234" },
  }).then((res) => res)
}

// 회원 유형 변경
export function updateUserType(id, type) {
  return request({
    url: `/admin/user/${id}/type`,
    method: "put",
    data: { type },
  }).then((res) => res)
}

import request from "@/utils/request"

// QNA 리스트 조회 (GET)
export function communityGetQnaList(params) {
  return request({
    url: "/api/qna",
    method: "get",
    params, // GET은 params로 전달
  })
}

// QNA 삭제 (예시)
export function communityDeleteQna(data) {
  return request({
    url: "/api/qna/delete",
    method: "post",
    data,
  })
}

// QNA 수정 (예시)
export function communityEditQna(data) {
  return request({
    url: "/api/qna/edit",
    method: "post",
    data,
  })
}

// QNA 답변 (예시)
export function communityReplyQna(data) {
  return request({
    url: "/api/qna/reply",
    method: "post",
    data,
  })
}

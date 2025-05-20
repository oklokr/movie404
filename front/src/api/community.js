import request from "@/utils/request"

export function communityGetQnaList(params) {
  return request({
    url: "/api/qna",
    method: "get",
    params,
  })
}

export function communityGetQnaDetail(qnaCode) {
  return request({
    url: `/api/qna/${qnaCode}`,
    method: "get",
  })
}

export function communityReplyQna(data) {
  return request({
    url: "/api/qna/reply",
    method: "post",
    data,
  })
}

export function communityEditQna(data) {
  return request({
    url: "/api/qna/edit",
    method: "post",
    data,
  })
}

export function communityDeleteQna(data) {
  return request({
    url: "/api/qna/delete",
    method: "post",
    data,
  })
}

export function communityGetNoticeList(params) {
  return request({
    url: "/api/notice",
    method: "get",
    params,
  })
}

export function communityGetNoticeDetail(noticeCode) {
  return request({
    url: `/api/notice/${noticeCode}`,
    method: "get",
  })
}

export function communityEditNotice(data) {
  return request({
    url: "/api/notice/edit",
    method: "post",
    data,
  })
}

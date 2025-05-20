import request from "@/utils/request"

// 회원 목록 조회
export function fetchUserList() {
  return request({
    url: "/api/admin/user",
    method: "get",
  }).then((res) => res)
}

// 회원 상세 조회
export function fetchUserDetail(id) {
  return request({
    url: `/api/admin/user/${id}`,
    method: "get",
  }).then((res) => res)
}

// 회원 비밀번호 초기화 (비밀번호를 1234로 변경)
export function resetUserPassword(id) {
  return request({
    url: `/api/admin/user/${id}/reset-password`,
    method: "post",
    data: { password: "1234" },
  }).then((res) => res)
}

// 회원 유형 변경
export function updateUserType(id, type) {
  return request({
    url: `/api/admin/user/${id}/type`,
    method: "put",
    data: { type },
  }).then((res) => res)
}

// 영화 목록 조회 (검색어: movieName)
export function fetchMovieList(params) {
  return request({
    url: "/api/admin/movie",
    method: "get",
    params,
  }).then((res) => res)
}

// 영화 등록 (FormData 사용)
export function createMovie(formData) {
  return request({
    url: "/api/admin/movie",
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => res)
}

// 영화 상세 조회
export function fetchMovieDetail(movieCode) {
  return request({
    url: `/api/admin/movie/${movieCode}`,
    method: "get",
  }).then((res) => res)
}

export function updateMovie(movieCode, formData) {
  return request({
    url: `/api/admin/movie/${movieCode}`,
    method: "put",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => res)
}

export function fetchGenreList() {
  return request({
    url: "/api/admin/movie/genres",
    method: "get",
  }).then((res) => res)
}

export function deleteMovie(movieCode) {
  return request({
    url: `/api/admin/movie/${movieCode}`,
    method: "delete",
  }).then((res) => res)
}

// 크리에이터(감독/출연진) 목록 조회
export function fetchCreatorList() {
  return request({
    url: "/api/admin/movie/creator",
    method: "get",
  }).then((res) => res)
}

export function updateUserTerms(data) {
  return request({
    url: "/api/admin/user/terms",
    method: "post",
    data,
  }).then((res) => res)
}
export function updateUserSet(data) {
  return request({
    url: "/api/admin/user/set",
    method: "post",
    data,
  }).then((res) => res)
}
export function updateUser(data) {
  return request({
    url: "/api/admin/user/info",
    method: "post",
    data,
  }).then((res) => res)
}
export function createSchedule(data) {
  return request({
    url: "/api/admin/movie/schedule",
    method: "post",
    data,
  }).then((res) => res)
}

export function fetchRunScheduleList(params) {
  return request({
    url: "/api/admin/movie/schedule",
    method: "get",
    params,
  }).then((res) => res)
}

export function selectUserVodList(data) {
  return request({
    url: "/api/admin/movie/uservodlist",
    method: "post",
    data,
  }).then((res) => res)
}

export function selectOrderList(data) {
  return request({
    url: "api/admin/user/orderlist",
    method: "post",
    data,
  }).then((res) => res)
}

export function authUser(data) {
  return request({
    url: "api/admin/authuser",
    method: "post",
    data,
  }).then((res) => res)
}

export function authVerify(data) {
  return request({
    url: data.url,
    method: "get",
    data,
  }).then((res) => console.log(res))
}

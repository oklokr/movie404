import request from "@/utils/request"

export function mainGetMovieList(data) {
  return request({
    url: "/api/main/movieList",
    method: "post",
    data,
  })
}

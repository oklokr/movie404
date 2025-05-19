import { mainGetMovieList } from "@/api/main"

function main() {
  mainGetMovieList({
    schedule: "1",
  }).then((res) => {
    const { code, data } = res
    if (code !== 200) return console.log("test")
    console.log(data)
  })

  return <div>main</div>
}

export default main

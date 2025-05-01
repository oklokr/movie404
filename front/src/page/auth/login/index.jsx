import { mypageLoginInfo } from "@/api/sample"

function login() {
  mypageLoginInfo({
    text: "false",
  }).then((res) => {
    console.log(res)
  })

  return <div>login</div>
}

export default login

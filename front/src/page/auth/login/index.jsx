import { mypageLoginInfo } from "@/api/sample"

function login() {
  mypageLoginInfo({
    text: "false",
  }).then((res) => {
    console.log(res)
  })

  return(
    <>
  <div>로그인로그인페이지 여기다가 코딩코딩 ㄱㄱ</div>
  <table><tr><th>테이블임</th><td>테이브으을</td></tr><tr><td>테이블임임</td><td>테이브으으을</td></tr></table>
  </>);
  
}

export default login

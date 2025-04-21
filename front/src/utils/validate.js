import _ from "lodash"
export const valid = {
  password: function (rule, value, callback) {
    //- 최소 8자리 이상 영문/숫자/특수문자 중 3가지 이상 조합
    //- 사용 가능 기호 ~!@#$%^&*()+-=|{\[]:;<>,./?
    const valid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+-=|\\{[\]:;<>,./?])(?!.*[^A-Za-z\d~!@#$%^&*()+-=|\\{[\]:;<>,./?]).{8,}$/
    if (value === "" || value === undefined) {
      return callback(new Error(i18n.t("MSG.40419"))) //Please enter your password.
    } else if (
      value.includes(this.postForm.loginId) ||
      value.includes(this.postForm.userId)
    ) {
      return callback(new Error(i18n.t("MSG.40929"))) //The same password as your account cannot be used.
    } else if (!valid.test(value)) {
      return callback(new Error(i18n.t("MSG.40687"))) //Yours must be a combination of eight letters, numbers and special characters.
    }
    callback()
  },
  email: function (rule, value, callback) {
    if (value === "" || value === undefined) {
      callback(new Error(i18n.t("MSG.40120"))) // 이메일을 입력해 주십시오.
    } else {
      //- 이메일의 로컬파트에 영문과 숫자, ._%+- 만 허용함
      //- @ 포함되어야함
      //- 2차 도메인은 아이피 형식 3*3자리 또는 영문과 숫자, 특수문자(-) 까지만 허용함
      //- 3차 2에서 4글자의 영문 알파벳 또는 아이피 형식 3자리만 혀용함
      if (
        !/^[a-zA-Z0-9._%+-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
          value,
        )
      ) {
        callback(new Error(i18n.t("MSG.40692"))) // 이메일 형식이 유효하지 않습니다.
      } else {
        callback()
      }
    }
  },

  emailCheck: function (value) {
    //- 이메일의 로컬파트에 영문과 숫자, ._%+- 만 허용함
    //- @ 포함되어야함
    //- 2차 도메인은 아이피 형식 3*3자리 또는 영문과 숫자, 특수문자(-) 까지만 허용함
    //- 3차 2에서 4글자의 영문 알파벳 또는 아이피 형식 3자리만 혀용함
    return /^[a-zA-Z0-9._%+-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
      value,
    )
  },
  phoneNumber: function (rule, value, callback) {
    if (
      value === "" ||
      value === undefined ||
      _.isEmpty(this.postForm.countryTpcd)
    ) {
      callback(new Error(i18n.t("MSG.40090"))) // 전화번호를 입력해 주십시오.
      return
    }
    callback()
  },
}

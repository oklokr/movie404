import axios from "axios"
import { useNavigate } from "react-router"

// import {
//   getToken,
//   removeTokenPrev,
//   removeApikeyPrev,
//   removeToken,
// } from "@/utils/auth"
// import { getLanguage } from "@/utils/language"
// import qs from "qs"
// import store from "@/store"
// import { getAssetGroupId } from './assetGroupId'
// import i18n from './i18n'
// import { func } from './function'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: "http://localhost:9080",
  timeout: 60000 * 10,
})

const mock = {
  "/web/v1/common/code/groups/all": "/codeAll.json",
  "/web/v1/mypage/login/info": "/info.json",
}

const pendingRequests = {}

const setInterceptors = (service) => {
  // request interceptor
  service.interceptors.request.use(
    (config) => {
      // if (process.env.NODE_ENV === 'staging') {
      //   if (mock[config.url]) {
      //     return Promise.reject(require('@/mock' + mock[config.url]))
      //   }
      // }
      if (pendingRequests[config.url]) {
        pendingRequests[config.url].cancel(config.url)
        delete pendingRequests[config.url]
      }

      const cancelTokenSource = axios.CancelToken.source()
      config.cancelToken = cancelTokenSource.token
      pendingRequests[config.url] = cancelTokenSource

      if (!config.test) {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1]
        if (token !== null) {
          config.headers["authorization"] = token
        }
        if (config.longTime) {
          config.timeout = 60000 * 10
        }
        // if (store.state.user.unit !== null) {
        //   for (const key of Object.keys(store.state.user.unit)) {
        //     if (key !== 'volumeUnitTpcdName') {
        //       config.headers[key] = store.state.user.unit[key]
        //     }
        //   }
        // }
        // config.headers["languageTpcd"] = getLanguage() || window.navigator.language.substring(0, 2)
      }
      config.data = config.data || {}
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return service
}

const serviceInterceptors = setInterceptors(service)

const forbiddenFunc = (code) => {
  if ([401, 403].includes(code)) {
    console.log("로그인이 필요한 서비스입니다")
    // if (getToken() === null) return true
    // func.toast(i18n.t('MSG.41718'), 'error') //'로그아웃 되었습니다.',
    // removeTokenPrev()
    // removeApikeyPrev()
    // removeToken()
    // store.dispatch('user/setLogout')
    console.log("api 통신 오류입니다")
    return true
  }
  return false
}

serviceInterceptors.interceptors.response.use(
  async (response) => {
    delete pendingRequests[response.config.url]
    const { code } = response.data
    if (forbiddenFunc(response)) {
      return Promise.reject(new Error("logout"))
    }
    return response.data
  },
  (error) => {
    if (error.status === 401) {
      console.log("로그인이 필요한 서비스입니다")
      window.location.href = "/login"
    }
    if (axios.isCancel(error)) {
      delete pendingRequests[error.message]
      return Promise.resolve(error)
    }
    const { code } = error.response?.data
    if (forbiddenFunc(parseInt(code))) {
      return Promise.reject(error)
    }
    if (error.msg === "success") {
      return Promise.resolve(error)
    }
    return Promise.reject(error)
  },
)

export default service
export { setInterceptors, pendingRequests }

import { createContext, useContext } from "react"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import translationEN from "./en/translationEN.json"
import translationKO from "./ko/translationKO.json"

const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "ko", // 기본 설정 언어, 'cimode'로 설정할 경우 키 값으로 출력된다.
  fallbackLng: "en", // 번역 파일에서 찾을 수 없는 경우 기본 언어
  interpolation: {
    escapeValue: false,
  },
})

const i18nContext = createContext({ i18n })
export const $i18n = () => useContext(i18nContext)

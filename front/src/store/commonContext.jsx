// CommonContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { commonCodeList } from "@/api/common"

const CommonContext = createContext({ code: null, ready: false })

export const CommonProvider = ({ children }) => {
  const [code, setCode] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const cached = localStorage.getItem("commonCode")
    if (cached) {
      setCode(JSON.parse(cached))
      setReady(true)
    } else {
      ;(async () => {
        try {
          const { code, data, message } = await commonCodeList()
          if (resCode !== 200) throw new Error(message)
          localStorage.setItem("commonCode", JSON.stringify(data))
          setCode(data)
        } catch (e) {
          console.error(e)
        } finally {
          setReady(true)
        }
      })()
    }
  }, [])

  /** 🔑 code·ready가 바뀔 때만 새 객체 생성 */
  const value = useMemo(() => ({ code, ready }), [code, ready])

  return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
}

export const useCommon = () => useContext(CommonContext)

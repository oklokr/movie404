import { createContext, useContext, useState, useCallback } from "react"

const PopupContext = createContext()

export const PopupProvider = ({ children }) => {
  const [popups, setPopups] = useState([])

  // content에 ReactNode(컴포넌트, 마크업 등) 허용
  const openPopup = useCallback(({ content, ...rest }) => {
    const id = Date.now() + Math.random()
    setPopups((prev) => [...prev, { id, open: true, content, ...rest }])
    return id
  }, [])

  const closePopup = useCallback((id) => {
    setPopups((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const closeAllPopups = useCallback(() => setPopups([]), [])

  return (
    <PopupContext.Provider value={{ popups, openPopup, closePopup, closeAllPopups }}>
      {children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)

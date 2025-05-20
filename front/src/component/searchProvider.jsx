import { createContext, useContext, useState } from "react"

const SearchContext = createContext()

export const useSearch = () => useContext(SearchContext)

export function SearchProvider({ children }) {
  const [searchListVisible, setSearchListVisible] = useState(false)
  const [searchGenre, setSearchGenre] = useState(null)

  const showSearchList = (genre) => {
    setSearchGenre(genre)
    setSearchListVisible(true)
  }

  const hideSearchList = () => {
    setSearchGenre(null)
    setSearchListVisible(false)
  }

  return (
    <SearchContext.Provider
      value={{ searchListVisible, searchGenre, showSearchList, hideSearchList }}
    >
      {children}
    </SearchContext.Provider>
  )
}

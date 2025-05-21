import { css } from "@emotion/react"
import { Button, IconButton, CircularProgress } from "@mui/material"
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react"
import { useLocation } from "react-router"
import CloseIcon from "@mui/icons-material/Close"
import { mainGetMovieList } from "@/api/main"
import { useModal } from "@/component/modalProvider"

// ✅ Context 정의
const SearchContext = createContext()
const SearchVisibleContext = createContext()

export const useSearch = () => useContext(SearchContext)
export const useSearchVisible = () => useContext(SearchVisibleContext)

export function SearchProvider({ children }) {
  const [searchListVisible, setSearchListVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [searchPostForm, setSearchPostForm] = useState({
    genreTpcd: null,
    keyword: null,
    schedule: null,
  })
  const [movieList, setMovieList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const loaderRef = useRef()
  const movieWrapRef = useRef()
  const pageRef = useRef(page)
  const hasMoreRef = useRef(hasMore)
  const loadingRef = useRef(loading)
  const searchPostFormRef = useRef(searchPostForm)

  const { pathname } = useLocation()
  const { openModal, showAlert } = useModal()

  useEffect(() => {
    pageRef.current = page
  }, [page])
  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])
  useEffect(() => {
    loadingRef.current = loading
  }, [loading])
  useEffect(() => {
    searchPostFormRef.current = searchPostForm
  }, [searchPostForm])

  const fetchMovie = useCallback(
    async (nextPage = 1, append = false) => {
      if (loadingRef.current || !hasMoreRef.current) return

      setLoading(true)
      try {
        const res = await mainGetMovieList({
          ...searchPostFormRef.current,
          size: 30,
          page: nextPage,
        })

        if (res.code !== 200) {
          showAlert({ message: "통신 오류입니다 다시 시도해주세요.", type: "error" })
          return
        }

        const fetched = res.data?.list ?? []
        setMovieList((prev) => (append ? [...prev, ...fetched] : fetched))
        setHasMore(fetched.length > 0)
        setPage(nextPage)
      } catch (e) {
        showAlert({ message: "오류가 발생했습니다.", type: "error" })
      } finally {
        setLoading(false)
      }
    },
    [showAlert],
  )

  const showSearchList = useCallback(({ genreTpcd, keyword, schedule }) => {
    setMovieList([])
    setPage(1)
    setHasMore(true)
    setSearchPostForm({ genreTpcd, keyword, schedule })
    setSearchListVisible(true)

    setTimeout(() => setActive(true), 0)
    document.body.style.overflow = "hidden"
  }, [])

  const hideSearchList = useCallback(() => {
    setActive(false)
    setTimeout(() => {
      setSearchListVisible(false)
      setMovieList([])
      setPage(1)
      setHasMore(true)
      setSearchPostForm({ genreTpcd: null, keyword: null, schedule: null })
      document.body.style.overflow = ""
    }, 200)
  }, [])

  useEffect(() => {
    const { genreTpcd, keyword, schedule } = searchPostForm

    const hasSearchParam =
      genreTpcd !== null ||
      (keyword && keyword.trim() !== "") ||
      (schedule && schedule.trim() !== "")

    if (searchListVisible && hasSearchParam) {
      fetchMovie(1, false)
    }
  }, [
    searchListVisible,
    searchPostForm.genreTpcd,
    searchPostForm.keyword,
    searchPostForm.schedule,
    fetchMovie,
  ])

  useEffect(() => {
    if (!searchListVisible || !active) return
    if (!loaderRef.current || !movieWrapRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current && !loadingRef.current) {
          fetchMovie(pageRef.current + 1, true)
        }
      },
      {
        root: movieWrapRef.current,
        rootMargin: "100px",
        threshold: 0.5,
      },
    )

    observer.observe(loaderRef.current)
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [fetchMovie, searchListVisible, active])

  const searchProviderStyle = css`
    width: 100vw;
    height: 100vh;
    padding-top: 58px;
    position: fixed;
    top: 0;
    left: 0;
    background: ${pathname === "/main" ? "#000" : "#fff"};
    opacity: 0;
    transform: scale(0);
    transition:
      transform 0.3s,
      opacity 0.2s;
    z-index: 30;
    overflow: scroll;
    box-sizing: border-box;
    &.active {
      opacity: 1;
      transform: scale(1);
    }

    .movie-wrap {
      min-width: 1200px;
      padding: 80px 40px 40px;
      position: relative;
      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      li {
        width: calc((100% / 5) - 32px);
      }

      .movie-poster {
        border: 1px solid #ddd;
        span {
          display: block;
          img {
            width: 100%;
            display: block;
          }
        }
        .info {
          padding: 8px 0;
          p {
            margin: 0 0 8px;
          }
        }
      }
    }
  `

  const closeBtnStyle = css`
    position: absolute;
    top: 0;
    right: 0;
    color: ${pathname === "/main" ? "#fff" : "#000"};
    z-index: 10;
    svg {
      width: 48px;
      height: 48px;
    }
  `

  return (
    <SearchContext.Provider
      value={{ searchListVisible, searchPostForm, showSearchList, hideSearchList }}
    >
      <SearchVisibleContext.Provider value={searchListVisible}>
        {children}
        {searchListVisible && (
          <div
            className={`${pathname === "/main" ? "main-page" : ""} ${active ? "active" : ""}`}
            css={searchProviderStyle}
            ref={movieWrapRef}
          >
            <div className="movie-wrap" tabIndex={0} role="region" aria-live="polite">
              <IconButton css={closeBtnStyle} onClick={hideSearchList} aria-label="검색 닫기">
                <CloseIcon />
              </IconButton>
              <ul>
                {movieList.map((item) => (
                  <li key={item.movieCode}>
                    <div className="movie-poster">
                      <span>
                        <img src={item.poster} alt={item.movieName} loading="lazy" />
                      </span>
                      <div className="info">
                        <p>{item.movieName}</p>
                        <Button
                          variant="contained"
                          size="small"
                          aria-label={`${item.movieName} 상세보기`}
                        >
                          상세보기
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {loading && (
                <div style={{ textAlign: "center", padding: "16px" }}>
                  <CircularProgress size={24} />
                </div>
              )}
              {!hasMore && !loading && (
                <div style={{ color: "#888", textAlign: "center", margin: "24px 0" }}>
                  더 이상 결과가 없습니다.
                </div>
              )}
              <div ref={loaderRef} style={{ height: "1px" }} />
            </div>
          </div>
        )}
      </SearchVisibleContext.Provider>
    </SearchContext.Provider>
  )
}

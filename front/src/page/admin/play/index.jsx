import { useState } from "react"
import { css } from "@emotion/react"

const hours = Array.from({ length: 19 }, (_, i) => i + 6) // 06~24
const PAGE_SIZE = 5

export default function Play() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [theaters, setTheaters] = useState([
    { id: 1, name: "1관" },
    { id: 2, name: "2관" },
  ])
  const [selectedTheater, setSelectedTheater] = useState(1)
  const [selectedHours, setSelectedHours] = useState({ 1: [], 2: [] })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [goStep2, setGoStep2] = useState(false)

  // 영화선택 모달 상태
  const [movieModalOpen, setMovieModalOpen] = useState(false)
  const [movieSearch, setMovieSearch] = useState("")
  const [movieList, setMovieList] = useState([
    // 더미 데이터
    {
      id: 1,
      genre: "액션",
      title: "액션영화",
      price: "10000",
      discount: "8000",
      desc: "액션영화 설명",
      cast: "액션배우",
      director: "액션감독",
    },
    {
      id: 2,
      genre: "코미디",
      title: "코미디영화",
      price: "12000",
      discount: "10000",
      desc: "코미디영화 설명",
      cast: "코미디배우",
      director: "코미디감독",
    },
    {
      id: 3,
      genre: "드라마",
      title: "드라마영화",
      price: "11000",
      discount: "9000",
      desc: "드라마영화 설명",
      cast: "드라마배우",
      director: "드라마감독",
    },
    {
      id: 4,
      genre: "공포",
      title: "공포영화",
      price: "13000",
      discount: "11000",
      desc: "공포영화 설명",
      cast: "공포배우",
      director: "공포감독",
    },
    {
      id: 5,
      genre: "SF",
      title: "SF영화",
      price: "15000",
      discount: "13000",
      desc: "SF영화 설명",
      cast: "SF배우",
      director: "SF감독",
    },
    {
      id: 6,
      genre: "로맨스",
      title: "로맨스영화",
      price: "9000",
      discount: "7000",
      desc: "로맨스영화 설명",
      cast: "로맨스배우",
      director: "로맨스감독",
    },
    {
      id: 7,
      genre: "스릴러",
      title: "스릴러영화",
      price: "14000",
      discount: "12000",
      desc: "스릴러영화 설명",
      cast: "스릴러배우",
      director: "스릴러감독",
    },
    {
      id: 8,
      genre: "판타지",
      title: "판타지영화",
      price: "16000",
      discount: "14000",
      desc: "판타지영화 설명",
      cast: "판타지배우",
      director: "판타지감독",
    },
    {
      id: 9,
      genre: "애니메이션",
      title: "애니영화",
      price: "8000",
      discount: "6000",
      desc: "애니영화 설명",
      cast: "애니배우",
      director: "애니감독",
    },
    {
      id: 10,
      genre: "다큐",
      title: "다큐영화",
      price: "7000",
      discount: "5000",
      desc: "다큐영화 설명",
      cast: "다큐배우",
      director: "다큐감독",
    },
  ])
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [moviePage, setMoviePage] = useState(1)
  const [selectedMovieInfo, setSelectedMovieInfo] = useState(null)

  // 가격/할인가 입력 상태
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")

  // 시간 클릭 핸들러 (최대 3시간, 연속, 중간 자동채움)
  const handleHourClick = (theaterId, hour) => {
    setSelectedHours((prev) => {
      const prevArr = prev[theaterId] || []
      // 이미 선택된 시간 클릭 시 해제
      if (prevArr.includes(hour)) {
        return {
          ...prev,
          [theaterId]: prevArr.filter((h) => h !== hour),
        }
      }
      // 아무것도 없으면 추가
      if (prevArr.length === 0) {
        return { ...prev, [theaterId]: [hour] }
      }
      // 1개 선택된 상태에서 클릭
      if (prevArr.length === 1) {
        const min = Math.min(prevArr[0], hour)
        const max = Math.max(prevArr[0], hour)
        // 2개 연속이면 2개, 아니면 2개만 선택
        if (Math.abs(prevArr[0] - hour) === 1) {
          return { ...prev, [theaterId]: [min, max] }
        }
        // 2개 이상 차이나면 중간 채움(최대 3개)
        if (Math.abs(prevArr[0] - hour) === 2) {
          return { ...prev, [theaterId]: [min, min + 1, max] }
        }
        // 그 외는 2개만 선택
        return { ...prev, [theaterId]: [prevArr[0], hour] }
      }
      // 2개 선택된 상태에서 클릭
      if (prevArr.length === 2) {
        const arr = [...prevArr, hour].sort((a, b) => a - b)
        // 3개 연속이면 3개 모두
        if (arr[2] - arr[0] === 2 && arr[1] - arr[0] === 1 && arr[2] - arr[1] === 1) {
          return { ...prev, [theaterId]: arr }
        }
        // 3개 연속이 아니면 마지막 2개+새로 클릭한 것 중 2개만 남김
        return { ...prev, [theaterId]: [prevArr[1], hour] }
      }
      // 이미 3개 선택된 상태에서는 아무 동작 안함
      if (prevArr.length >= 3) {
        return prev
      }
      return prev
    })
  }

  const handleAddTheater = () => {
    const nextId = theaters.length > 0 ? Math.max(...theaters.map((t) => t.id)) + 1 : 1
    setTheaters([...theaters, { id: nextId, name: `${nextId}관` }])
    setSelectedHours((prev) => ({ ...prev, [nextId]: [] }))
  }

  const handleDeleteTheater = (id) => {
    setDeleteTarget(id)
  }

  const confirmDelete = () => {
    setTheaters((prev) => prev.filter((t) => t.id !== deleteTarget))
    setSelectedHours((prev) => {
      const newObj = { ...prev }
      delete newObj[deleteTarget]
      return newObj
    })
    setTimeout(() => {
      setSelectedTheater((prev) => {
        if (prev === deleteTarget) {
          const remain = theaters.filter((t) => t.id !== deleteTarget)
          return remain.length > 0 ? remain[0].id : null
        }
        return prev
      })
    }, 0)
    setDeleteTarget(null)
  }

  const cancelDelete = () => {
    setDeleteTarget(null)
  }

  // step1 → step2 이동 조건: 날짜 선택 + 2시간 이상 선택
  const canGoNext = (() => {
    if (!selectedDate) return false
    const hoursArr = selectedHours[selectedTheater] || []
    return hoursArr.length >= 2
  })()

  // step2에서 사용할 데이터
  const selectedHourArr = selectedHours[selectedTheater]?.sort((a, b) => a - b) || []

  // 영화 모달 페이징 및 필터링
  const filteredMovies = movieList.filter((m) => m.title.includes(movieSearch))
  const totalPages = Math.ceil(filteredMovies.length / PAGE_SIZE)
  const pagedMovies = filteredMovies.slice((moviePage - 1) * PAGE_SIZE, moviePage * PAGE_SIZE)

  // Step2 화면
  if (step === 2 && goStep2) {
    return (
      <div>
        <div css={stepWrap}>
          <span css={stepCircle(false)}>1</span>
          <span css={stepCircle(true)}>2</span>
        </div>
        <div css={tableWrap}>
          <table css={infoTable}>
            <tbody>
              <tr>
                <th css={thStyle}>영화관</th>
                <td>{theaters.find((t) => t.id === selectedTheater)?.name}</td>
                <th css={thStyle}>날짜</th>
                <td>{selectedDate}</td>
              </tr>
              <tr>
                <th css={thStyle}>입장시간</th>
                <td>{selectedHourArr[0]?.toString().padStart(2, "0")}시</td>
                <th css={thStyle}>퇴장시간</th>
                <td>
                  {selectedHourArr[selectedHourArr.length - 1] !== undefined
                    ? (selectedHourArr[selectedHourArr.length - 1] + 1)
                        .toString()
                        .padStart(2, "0") + "시"
                    : ""}
                </td>
              </tr>
              <tr>
                <th css={thStyle}>가격</th>
                <td>
                  <input
                    css={inputStyle}
                    type="number"
                    placeholder="가격"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </td>
                <th css={thStyle}>할인가격</th>
                <td>
                  <input
                    css={inputStyle}
                    type="number"
                    placeholder="할인가격"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th css={thStyle}>영화정보</th>
                <td colSpan={3}>
                  <div css={movieInfoBox}>
                    <div css={moviePosterBox}></div>
                    <div>
                      <div>
                        제목 :{" "}
                        {selectedMovieInfo ? selectedMovieInfo.title : "영화를 등록해주세요."}
                      </div>
                      <div>
                        설명 : {selectedMovieInfo ? selectedMovieInfo.desc : "영화를 등록해주세요."}
                      </div>
                      <div>
                        출연진 :{" "}
                        {selectedMovieInfo ? selectedMovieInfo.cast : "영화를 등록해주세요."}
                      </div>
                      <div>
                        감독 :{" "}
                        {selectedMovieInfo ? selectedMovieInfo.director : "영화를 등록해주세요."}
                      </div>
                    </div>
                    <button
                      css={movieRegBtn}
                      onClick={() => {
                        setMovieModalOpen(true)
                        setMoviePage(1)
                        setMovieSearch("")
                        setSelectedMovieId(selectedMovieInfo?.id ?? null)
                      }}
                    >
                      등록
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div css={footerWrap}>
          <button
            css={prevBtn}
            onClick={() => {
              setStep(1)
              setGoStep2(false)
            }}
          >
            이전
          </button>
          <button css={nextBtn}>적용</button>
        </div>
        {movieModalOpen && (
          <div css={modalOverlay}>
            <div css={movieModalBox}>
              <div css={movieModalHeader}>
                <span>영화선택</span>
                <button css={movieModalCloseBtn} onClick={() => setMovieModalOpen(false)}>
                  ×
                </button>
              </div>
              <div css={movieModalBody}>
                <div css={movieModalFilterWrap}>
                  <input
                    css={movieModalInput}
                    placeholder="영화명"
                    value={movieSearch}
                    onChange={(e) => {
                      setMovieSearch(e.target.value)
                      setMoviePage(1)
                    }}
                  />
                  <button css={movieModalSearchBtn} onClick={() => setMoviePage(1)}>
                    검색
                  </button>
                </div>
                <div css={movieModalCount}>총 {filteredMovies.length} 개</div>
                <div css={movieModalTableWrap}>
                  <table css={movieModalTable}>
                    <thead>
                      <tr>
                        <th>장르</th>
                        <th>제목</th>
                        <th>설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedMovies.map((movie) => (
                        <tr
                          key={movie.id}
                          css={selectedMovieId === movie.id ? movieModalRowActive : undefined}
                          onClick={() => setSelectedMovieId(movie.id)}
                        >
                          <td>{movie.genre}</td>
                          <td>{movie.title}</td>
                          <td
                            style={{
                              maxWidth: 180,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {movie.desc}
                          </td>
                        </tr>
                      ))}
                      {pagedMovies.length === 0 && (
                        <tr>
                          <td colSpan={3} style={{ textAlign: "center", color: "#888" }}>
                            검색 결과가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div css={movieModalPaging}>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      css={movieModalPageBtn}
                      style={{
                        background: moviePage === i + 1 ? "#ff9800" : "#fff",
                        color: moviePage === i + 1 ? "#fff" : "#888",
                        fontWeight: moviePage === i + 1 ? 700 : 400,
                      }}
                      onClick={() => setMoviePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div css={movieModalFooter}>
                  <button css={movieModalCancelBtn} onClick={() => setMovieModalOpen(false)}>
                    취소
                  </button>
                  <button
                    css={movieModalApplyBtn}
                    disabled={selectedMovieId === null}
                    onClick={() => {
                      const movie = movieList.find((m) => m.id === selectedMovieId)
                      setSelectedMovieInfo(movie)
                      setPrice(movie.price)
                      setDiscount(movie.discount)
                      setMovieModalOpen(false)
                    }}
                  >
                    적용
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Step1 화면
  return (
    <div>
      <div css={stepWrap}>
        <span css={stepCircle(step === 1)}>1</span>
        <span css={stepCircle(step === 2)}>2</span>
      </div>
      <div css={filterBox}>
        <label css={filterLabel}>날짜선택</label>
        <input
          css={inputStyle}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div>
        {theaters.map((theater) => (
          <div key={theater.id} css={theaterBox(selectedTheater === theater.id)}>
            <div
              css={theaterHeader(selectedTheater === theater.id)}
              onClick={() => setSelectedTheater(theater.id)}
            >
              {theater.name}
              {theaters.length > 1 && (
                <button
                  css={deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteTheater(theater.id)
                  }}
                  title="상영관 삭제"
                >
                  ×
                </button>
              )}
            </div>
            {selectedTheater === theater.id && (
              <div css={hourRow}>
                {hours.map((hour) => (
                  <button
                    key={hour}
                    css={hourBtn(selectedHours[theater.id]?.includes(hour))}
                    onClick={() => handleHourClick(theater.id, hour)}
                  >
                    {hour.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div css={addTheaterWrap}>
          <button css={addBtn} onClick={handleAddTheater}>
            상영관 추가하기
          </button>
        </div>
      </div>
      <div css={footerWrap}>
        <button
          css={nextBtn}
          disabled={!canGoNext}
          onClick={() => {
            setStep(2)
            setGoStep2(true)
          }}
        >
          다음
        </button>
      </div>
      {deleteTarget !== null && (
        <div css={modalOverlay}>
          <div css={modalBox}>
            <div css={modalMsg}>정말 삭제하시겠습니까?</div>
            <div css={modalBtnWrap}>
              <button css={modalBtn} onClick={confirmDelete}>
                삭제
              </button>
              <button css={modalBtnCancel} onClick={cancelDelete}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- 스타일 ---
const stepWrap = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  justify-content: center;
`
const stepCircle = (active) => css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${active ? "#1976d2" : "#eee"};
  color: ${active ? "#fff" : "#888"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 22px;
`
const filterBox = css`
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: #fafbfc;
  padding: 24px 24px 16px 24px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
`
const filterLabel = css`
  font-weight: 500;
  font-size: 15px;
  color: #222;
`
const inputStyle = css`
  padding: 7px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
`
const theaterBox = (active) => css`
  margin-bottom: 18px;
  border-radius: 8px;
  border: 1.5px solid #ddd;
  background: ${active ? "#fff" : "#f5f5f5"};
`
const theaterHeader = (active) => css`
  padding: 14px 18px;
  font-size: 17px;
  font-weight: 600;
  background: ${active ? "#fff" : "#eee"};
  color: ${active ? "#222" : "#888"};
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const deleteBtn = css`
  margin-left: 8px;
  background: none;
  border: none;
  color: #e57373;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
  &:hover {
    color: #d32f2f;
    background: #ffeaea;
    border-radius: 50%;
  }
`
const hourRow = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 18px;
  flex-wrap: wrap;
`
const hourBtn = (selected) => css`
  width: 38px;
  height: 38px;
  border: 1px solid ${selected ? "#1976d2" : "#ccc"};
  background: ${selected ? "#1976d2" : "#fff"};
  color: ${selected ? "#fff" : "#222"};
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  margin-right: 2px;
  cursor: pointer;
  &:hover {
    background: #e3f2fd;
  }
`
const addTheaterWrap = css`
  display: flex;
  justify-content: flex-start;
  margin: 12px 0 0 0;
`
const addBtn = css`
  padding: 8px 18px;
  border: none;
  border-radius: 4px;
  background: #eee;
  color: #888;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
`
const footerWrap = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
`
const nextBtn = css`
  padding: 10px 32px;
  border: none;
  border-radius: 6px;
  background: #eee;
  color: #888;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:enabled {
    background: #ff9800;
    color: #fff;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const prevBtn = css`
  padding: 10px 32px;
  border: none;
  border-radius: 6px;
  background: #eee;
  color: #888;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #bdbdbd;
    color: #fff;
  }
`
const modalOverlay = css`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`
const modalBox = css`
  background: #fff;
  border-radius: 10px;
  padding: 32px 28px 22px 28px;
  min-width: 260px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
`
const modalMsg = css`
  font-size: 18px;
  color: #222;
  margin-bottom: 22px;
  font-weight: 500;
`
const modalBtnWrap = css`
  display: flex;
  gap: 16px;
`
const modalBtn = css`
  padding: 8px 22px;
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: #b71c1c;
  }
`
const modalBtnCancel = css`
  padding: 8px 22px;
  background: #eee;
  color: #888;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: #bdbdbd;
    color: #fff;
  }
`
const tableWrap = css`
  margin: 0 auto;
  margin-bottom: 24px;
  max-width: 800px;
`
const infoTable = css`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  th,
  td {
    border: 1px solid #ddd;
    padding: 12px 16px;
    font-size: 16px;
    text-align: left;
  }
  th {
    background: #f5f5f5;
    font-weight: 600;
    width: 120px;
  }
`
const thStyle = css`
  background: #f5f5f5;
  font-weight: 600;
  width: 120px;
`
const movieInfoBox = css`
  display: flex;
  align-items: center;
  gap: 18px;
`
const moviePosterBox = css`
  width: 80px;
  height: 100px;
  background: #e0e0e0;
  border-radius: 6px;
  margin-right: 12px;
`
const movieRegBtn = css`
  margin-left: 24px;
  padding: 8px 18px;
  border: none;
  border-radius: 4px;
  background: #eee;
  color: #888;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
`

// 영화선택 모달 스타일
const movieModalBox = css`
  background: #fff;
  border-radius: 12px;
  min-width: 540px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  padding: 0;
  overflow: hidden;
`
const movieModalHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  font-weight: 700;
  padding: 22px 28px 12px 28px;
  border-bottom: 1px solid #eee;
`
const movieModalCloseBtn = css`
  background: none;
  border: none;
  font-size: 28px;
  color: #888;
  cursor: pointer;
  &:hover {
    color: #d32f2f;
  }
`
const movieModalBody = css`
  padding: 18px 28px 24px 28px;
`
const movieModalFilterWrap = css`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`
const movieModalInput = css`
  flex: 1;
  padding: 7px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
`
const movieModalSearchBtn = css`
  padding: 7px 18px;
  border: none;
  border-radius: 4px;
  background: #eee;
  color: #888;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
`
const movieModalCount = css`
  font-size: 15px;
  color: #888;
  margin-bottom: 8px;
`
const movieModalTableWrap = css`
  max-height: 220px;
  overflow-y: auto;
  margin-bottom: 12px;
`
const movieModalTable = css`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px 10px;
    font-size: 15px;
    text-align: left;
  }
  th {
    background: #f5f5f5;
    font-weight: 600;
  }
  tr {
    cursor: pointer;
  }
`
const movieModalRowActive = css`
  background: #e3f2fd !important;
`
const movieModalPaging = css`
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-bottom: 18px;
`
const movieModalPageBtn = css`
  padding: 4px 12px;
  border: 1px solid #ccc;
  background: #fff;
  color: #888;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
`
const movieModalFooter = css`
  display: flex;
  gap: 18px;
  justify-content: flex-end;
`
const movieModalCancelBtn = css`
  padding: 8px 22px;
  background: #eee;
  color: #888;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: #bdbdbd;
    color: #fff;
  }
`
const movieModalApplyBtn = css`
  padding: 8px 22px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  &:disabled {
    background: #bdbdbd;
    color: #fff;
    cursor: not-allowed;
  }
`

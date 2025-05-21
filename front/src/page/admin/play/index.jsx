import { useState, useEffect } from "react"
import { css } from "@emotion/react"
import Button from "@mui/material/Button"
import {
  fetchMovieList,
  fetchCreatorList,
  createSchedule,
  fetchRunScheduleList,
  createTheater,
  deleteTheater,
} from "@/api/admin"

const hours = Array.from({ length: 17 }, (_, i) => i + 6) // 06~22
const PAGE_SIZE = 5

function getCreatorName(code, creatorList) {
  if (!code || !creatorList) return ""
  const found = creatorList.find((c) => c.code === code)
  return found ? found.name : code
}

export default function Play() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [theaters, setTheaters] = useState([
    { id: 1, code: "T001", name: "1관" },
    { id: 2, code: "T002", name: "2관" },
  ])
  const [selectedTheater, setSelectedTheater] = useState(1)
  const [selectedHours, setSelectedHours] = useState({ 1: [], 2: [] })
  const [goStep2, setGoStep2] = useState(false)

  const [reservedHours, setReservedHours] = useState({})

  const [movieModalOpen, setMovieModalOpen] = useState(false)
  const [movieSearch, setMovieSearch] = useState("")
  const [movieList, setMovieList] = useState([])
  const [movieTotal, setMovieTotal] = useState(0)
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [moviePage, setMoviePage] = useState(1)
  const [selectedMovieInfo, setSelectedMovieInfo] = useState(null)

  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")

  const [creatorList, setCreatorList] = useState([])

  const [confirmApplyOpen, setConfirmApplyOpen] = useState(false)

  const fetchReserved = async (date, theaters) => {
    if (!date) {
      setReservedHours({})
      return
    }
    const result = {}
    for (const t of theaters) {
      try {
        const res = await fetchRunScheduleList({
          runDate: date,
          theaterCode: t.code,
        })
        const list = res.data ? res.data : res
        let hoursArr = []
        for (const sch of list) {
          if (sch.startTime && sch.endTime) {
            const start = parseInt(sch.startTime.split(":")[0], 10)
            const end = parseInt(sch.endTime.split(":")[0], 10)
            for (let h = start; h < end; h++) {
              hoursArr.push(h)
            }
          }
        }
        result[t.id] = hoursArr
      } catch (e) {
        result[t.id] = []
      }
    }
    setReservedHours(result)
  }

  useEffect(() => {
    fetchReserved(selectedDate, theaters)
  }, [selectedDate, theaters.length])

  useEffect(() => {
    if (step === 1) fetchReserved(selectedDate, theaters)
  }, [step])

  useEffect(() => {
    fetchCreatorList()
      .then((res) => {
        setCreatorList(res.data ? res.data : res)
      })
      .catch((err) => {
        alert("크리에이터 목록을 불러올 수 없습니다.\n" + (err?.message || err))
      })
  }, [])

  useEffect(() => {
    if (movieModalOpen) {
      fetchMovieList({
        movieName: movieSearch,
        page: moviePage,
        size: PAGE_SIZE,
      }).then((res) => {
        const data = res.data || res
        setMovieList(data.list || [])
        setMovieTotal(data.total || 0)
      })
    }
  }, [movieModalOpen, movieSearch, moviePage])

  // 시간 클릭 핸들러 (예약된 시간대는 선택 불가)
  const handleHourClick = (theaterId, hour) => {
    if (reservedHours[theaterId]?.includes(hour) || !selectedDate) return
    setSelectedHours((prev) => {
      const prevArr = prev[theaterId] || []
      // 이미 선택된 시간 클릭 시 해제
      if (prevArr.includes(hour)) {
        return {
          ...prev,
          [theaterId]: prevArr.filter((h) => h !== hour),
        }
      }
      // 선택된 시간대가 없으면 선택
      if (prevArr.length === 0) {
        return { ...prev, [theaterId]: [hour] }
      }
      // 선택된 시간대가 1개일 때, 새로 클릭한 시간이 ±2 이내면 사이 구간 자동 선택
      if (prevArr.length === 1) {
        const base = prevArr[0]
        if (Math.abs(hour - base) <= 2) {
          const min = Math.min(base, hour)
          const max = Math.max(base, hour)
          // 최대 3개까지만 허용
          if (max - min > 2) return prev
          const range = []
          for (let h = min; h <= max; h++) range.push(h)
          return { ...prev, [theaterId]: range }
        }
        return prev
      }
      // 여러 개일 때는 기존 로직(연속성, 최대 3개)
      const min = Math.min(...prevArr)
      const max = Math.max(...prevArr)
      if (hour >= min - 2 && hour <= max + 2) {
        const newArr = [...prevArr, hour].sort((a, b) => a - b)
        const uniqueArr = Array.from(new Set(newArr))
        for (let i = 1; i < uniqueArr.length; i++) {
          if (uniqueArr[i] - uniqueArr[i - 1] !== 1) {
            return prev
          }
        }
        if (uniqueArr.length > 3) return prev
        return { ...prev, [theaterId]: uniqueArr }
      }
      return prev
    })
  }

  // 상영관 추가 시 DB에도 추가
  const handleAddTheater = async () => {
    const usedIds = theaters.map((t) => t.id)
    let nextId = 1
    while (usedIds.includes(nextId)) nextId++
    const nextCode = "T" + String(nextId).padStart(3, "0")
    const nextName = `${nextId}관`
    try {
      await createTheater({ code: nextCode, name: nextName })
      setTheaters((prev) => [...prev, { id: nextId, code: nextCode, name: nextName }])
      setSelectedHours((prev) => ({ ...prev, [nextId]: [] }))
    } catch (e) {
      alert("상영관 추가에 실패했습니다.\n" + (e?.message || e))
    }
  }

  // 상영관 삭제 시 DB에서도 삭제
  const handleDeleteTheater = async (id) => {
    const theater = theaters.find((t) => t.id === id)
    if ((reservedHours[id]?.length ?? 0) > 0) {
      alert("이미 상영이 등록된 상영관은 삭제할 수 없습니다.")
      return
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return
    try {
      await deleteTheater({ code: theater.code })
      setTheaters((prev) => prev.filter((t) => t.id !== id))
      setSelectedHours((prev) => {
        const newObj = { ...prev }
        delete newObj[id]
        return newObj
      })
      setTimeout(() => {
        setSelectedTheater((prev) => {
          if (prev === id) {
            const remain = theaters.filter((t) => t.id !== id)
            return remain.length > 0 ? remain[0].id : null
          }
          return prev
        })
      }, 0)
    } catch (e) {
      alert("상영관 삭제에 실패했습니다.\n" + (e?.message || e))
    }
  }

  const canGoNext = (() => {
    if (!selectedDate) return false
    const hoursArr = selectedHours[selectedTheater] || []
    return hoursArr.length >= 2
  })()

  const selectedHourArr = selectedHours[selectedTheater]?.sort((a, b) => a - b) || []

  const totalPages = Math.ceil(movieTotal / PAGE_SIZE)
  const pagedMovies = movieList

  const PAGINATION_BLOCK = 10
  const currentBlock = Math.floor((moviePage - 1) / PAGINATION_BLOCK)
  const startPage = currentBlock * PAGINATION_BLOCK + 1
  const endPage = Math.min(startPage + PAGINATION_BLOCK - 1, totalPages)

  const handlePrevBlock = () => {
    if (startPage > 1) setMoviePage(startPage - 1)
  }
  const handleNextBlock = () => {
    if (endPage < totalPages) setMoviePage(endPage + 1)
  }

  // 예약된 시간대 버튼 스타일 적용
  const hourBtn = (selected, reserved, disabled) => css`
    width: 38px;
    height: 38px;
    border: 2px solid ${selected ? "#1976d2" : reserved ? "#bbb" : disabled ? "#eee" : "#ccc"};
    background: ${selected ? "#1976d2" : reserved ? "#f3f3f3" : disabled ? "#f8f8f8" : "#fff"};
    color: ${selected ? "#fff" : reserved ? "#bbb" : disabled ? "#ccc" : "#222"};
    border-radius: 6px;
    font-size: 15px;
    font-weight: 700;
    margin-right: 2px;
    cursor: ${reserved || disabled ? "not-allowed" : "pointer"};
    opacity: ${reserved ? 0.45 : disabled ? 0.35 : 1};
    box-shadow: ${selected ? "0 0 0 2px #90caf9" : "none"};
    transition:
      background 0.15s,
      border 0.15s,
      color 0.15s,
      box-shadow 0.15s;
    &:hover {
      background: ${reserved || disabled ? "#f8f8f8" : "#e3f2fd"};
      border-color: ${reserved || disabled ? "#eee" : "#1976d2"};
      color: ${reserved || disabled ? "#ccc" : "#1976d2"};
      box-shadow: ${reserved || disabled ? "none" : "0 0 0 2px #1976d2"};
      z-index: 1;
    }
  `

  // Step2 화면
  if (step === 2 && goStep2) {
    const doApply = async () => {
      try {
        const selectedTheaterObj = theaters.find((t) => t.id === selectedTheater)
        const payload = {
          theaterCode: selectedTheaterObj.code,
          theaterName: selectedTheaterObj.name,
          runDate: selectedDate,
          startHour: selectedHourArr[0],
          endHour: selectedHourArr[selectedHourArr.length - 1] + 1,
          price: Number(price),
          discount: discount ? Number(discount) : null,
          movieCode: selectedMovieInfo.movieCode,
        }
        await createSchedule(payload)
        alert("상영 스케줄이 저장되었습니다.")
        setStep(1)
        setGoStep2(false)
        setSelectedMovieInfo(null)
        setPrice("")
        setDiscount("")
        setSelectedHours((prev) => ({ ...prev, [selectedTheater]: [] }))
      } catch (err) {
        alert("저장에 실패했습니다.\n" + (err?.message || err))
      }
    }

    const handleApply = () => {
      if (!selectedMovieInfo) {
        alert("영화를 등록해주세요.")
        return
      }
      if (!price) {
        alert("가격을 입력해주세요.")
        return
      }
      if (selectedHourArr.length < 2) {
        alert("상영 시간을 2시간 이상 선택해주세요.")
        return
      }
      setConfirmApplyOpen(true)
    }

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
                    ? selectedHourArr[selectedHourArr.length - 1].toString().padStart(2, "0") + "시"
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
                <th css={thStyle}>할인율</th>
                <td>
                  <input
                    css={inputStyle}
                    type="number"
                    placeholder="할인율(%)"
                    value={discount}
                    min={1}
                    max={100}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "")
                      if (value === "") value = ""
                      else if (Number(value) < 1) value = "1"
                      else if (Number(value) > 100) value = "100"
                      setDiscount(value)
                    }}
                  />{" "}
                  %
                </td>
              </tr>
              <tr>
                <th css={thStyle}>영화정보</th>
                <td colSpan={3}>
                  <div css={movieInfoBox}>
                    <div css={moviePosterBox}>
                      {selectedMovieInfo && selectedMovieInfo.poster && (
                        <img
                          src={selectedMovieInfo.poster}
                          alt="포스터"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 6,
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <div>
                        제목 :{" "}
                        {selectedMovieInfo ? selectedMovieInfo.movieName : "영화를 등록해주세요."}
                      </div>
                      <div css={movieInfoText}>
                        설명 :{" "}
                        {selectedMovieInfo
                          ? selectedMovieInfo.synopsis || "-"
                          : "영화를 등록해주세요."}
                      </div>
                      <div>
                        출연진 :{" "}
                        {selectedMovieInfo
                          ? [
                              getCreatorName(selectedMovieInfo.actorCodeA, creatorList),
                              getCreatorName(selectedMovieInfo.actorCodeB, creatorList),
                              getCreatorName(selectedMovieInfo.actorCodeC, creatorList),
                            ]
                              .filter(Boolean)
                              .join(", ") || "-"
                          : "영화를 등록해주세요."}
                      </div>
                      <div>
                        감독 :{" "}
                        {selectedMovieInfo
                          ? [
                              getCreatorName(selectedMovieInfo.directCodeA, creatorList),
                              getCreatorName(selectedMovieInfo.directCodeB, creatorList),
                            ]
                              .filter(Boolean)
                              .join(", ") || "-"
                          : "영화를 등록해주세요."}
                      </div>
                    </div>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setMovieModalOpen(true)
                        setMoviePage(1)
                        setMovieSearch("")
                        setSelectedMovieId(selectedMovieInfo?.movieCode ?? null)
                      }}
                      sx={{ ml: "auto", minWidth: 60, minHeight: 40 }}
                    >
                      등록
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div css={footerWrap}>
          <Button
            variant="outlined"
            onClick={() => {
              setStep(1)
              setGoStep2(false)
            }}
          >
            이전
          </Button>
          <Button variant="contained" onClick={handleApply}>
            적용
          </Button>
        </div>
        {confirmApplyOpen && (
          <div css={modalOverlay}>
            <div css={modalBox}>
              <div css={modalMsg}>정말로 상영스케줄을 등록하시겠습니까?</div>
              <div css={modalBtnWrap}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: 90, fontWeight: 600, fontSize: 16 }}
                  onClick={() => {
                    setConfirmApplyOpen(false)
                    doApply()
                  }}
                >
                  확인
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ minWidth: 90, fontWeight: 600, fontSize: 16 }}
                  onClick={() => setConfirmApplyOpen(false)}
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        )}
        {movieModalOpen && (
          <div css={modalOverlay}>
            <div css={movieModalBox}>
              <div css={movieModalHeader}>
                <span>영화선택</span>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setMovieModalOpen(false)}
                  sx={{ minWidth: 32, minHeight: 32, fontSize: 22, p: 0 }}
                >
                  ×
                </Button>
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
                  <Button variant="contained" onClick={() => setMoviePage(1)}>
                    검색
                  </Button>
                </div>
                <div css={movieModalCount}>총 {movieTotal} 개</div>
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
                          key={movie.movieCode}
                          css={
                            selectedMovieId === movie.movieCode ? movieModalRowActive : undefined
                          }
                          onClick={() => setSelectedMovieId(movie.movieCode)}
                        >
                          <td>{movie.genreCodeA || "-"}</td>
                          <td>{movie.movieName}</td>
                          <td
                            style={{
                              maxWidth: 180,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {movie.synopsis || "-"}
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
                  <Button variant="outlined" disabled={startPage === 1} onClick={handlePrevBlock}>
                    &lt;
                  </Button>
                  {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <Button
                      key={startPage + i}
                      variant={moviePage === startPage + i ? "contained" : "outlined"}
                      onClick={() => setMoviePage(startPage + i)}
                      sx={{
                        mx: 0.5,
                        fontWeight: moviePage === startPage + i ? 700 : 400,
                      }}
                    >
                      {startPage + i}
                    </Button>
                  ))}
                  <Button
                    variant="outlined"
                    disabled={endPage === totalPages}
                    onClick={handleNextBlock}
                  >
                    &gt;
                  </Button>
                </div>
                <div css={movieModalFooter}>
                  <Button variant="outlined" onClick={() => setMovieModalOpen(false)}>
                    취소
                  </Button>
                  <Button
                    variant="contained"
                    disabled={selectedMovieId === null}
                    onClick={() => {
                      const movie = movieList.find((m) => m.movieCode === selectedMovieId)
                      setSelectedMovieInfo(movie)
                      setPrice(movie.dvdPrice || "")
                      setDiscount(movie.dvdDiscount || "")
                      setMovieModalOpen(false)
                    }}
                  >
                    적용
                  </Button>
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
          onChange={(e) => {
            setSelectedDate(e.target.value)
            setSelectedHours({ 1: [], 2: [] }) // 날짜 변경 시 시간 초기화
          }}
        />
      </div>
      <div>
        {theaters
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((theater) => (
            <div key={theater.id} css={theaterBox(selectedTheater === theater.id)}>
              <div
                css={theaterHeader(selectedTheater === theater.id)}
                onClick={() => setSelectedTheater(theater.id)}
              >
                {theater.name}
                {theaters.length > 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      minWidth: 32,
                      minHeight: 32,
                      fontWeight: 700,
                      fontSize: 20,
                      ml: 1,
                      p: 0,
                      borderRadius: "50%",
                      lineHeight: 1,
                    }}
                    onClick={async (e) => {
                      e.stopPropagation()
                      await handleDeleteTheater(theater.id)
                    }}
                    title="상영관 삭제"
                  >
                    ×
                  </Button>
                )}
              </div>
              {selectedTheater === theater.id && (
                <div css={hourRow}>
                  {hours.map((hour) => {
                    const reserved = reservedHours[theater.id]?.includes(hour)
                    const selectedArr = selectedHours[theater.id] || []
                    const selected = selectedArr.includes(hour)
                    let disabled = reserved || !selectedDate
                    if (!disabled && selectedArr.length > 0 && !selected) {
                      if (selectedArr.length === 1) {
                        const base = selectedArr[0]
                        if (hour < base - 2 || hour > base + 2) disabled = true
                      } else {
                        const min = Math.min(...selectedArr)
                        const max = Math.max(...selectedArr)
                        if (hour < min - 2 || hour > max + 2) disabled = true
                      }
                    }
                    return (
                      <Button
                        key={hour}
                        variant={selected ? "contained" : "outlined"}
                        color={reserved ? "inherit" : "primary"}
                        disabled={disabled}
                        onClick={() => handleHourClick(theater.id, hour)}
                        sx={{
                          minWidth: 38,
                          minHeight: 38,
                          mx: 0.5,
                          my: 0.5,
                          fontWeight: 700,
                          opacity: reserved ? 0.45 : disabled ? 0.35 : 1,
                        }}
                        title={
                          !selectedDate
                            ? "날짜를 먼저 선택하세요"
                            : reserved
                              ? "이미 등록된 시간"
                              : selectedArr.length > 0 &&
                                  !selected &&
                                  ((selectedArr.length === 1 &&
                                    (hour < selectedArr[0] - 2 || hour > selectedArr[0] + 2)) ||
                                    (selectedArr.length > 1 &&
                                      (hour < Math.min(...selectedArr) - 2 ||
                                        hour > Math.max(...selectedArr) + 2)))
                                ? "선택된 시간대 기준 ±2시간만 선택 가능"
                                : undefined
                        }
                      >
                        {hour.toString().padStart(2, "0")}
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        <div css={addTheaterWrap}>
          <Button variant="contained" onClick={handleAddTheater}>
            상영관 추가하기
          </Button>
        </div>
      </div>
      <div css={footerWrap}>
        <Button
          variant="contained"
          disabled={!canGoNext}
          onClick={() => {
            setStep(2)
            setGoStep2(true)
          }}
        >
          다음
        </Button>
      </div>
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
const hourRow = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 18px;
  flex-wrap: wrap;
  justify-content: center;
`
const addTheaterWrap = css`
  display: flex;
  justify-content: flex-start;
  margin: 12px 0 0 0;
`
const footerWrap = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
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
  align-items: flex-start;
  gap: 18px;
  min-height: 100px;
  width: 100%;
  position: relative;
`
const moviePosterBox = css`
  width: 80px;
  height: 100px;
  background: #e0e0e0;
  border-radius: 6px;
  margin-right: 12px;
  flex-shrink: 0;
  overflow: hidden;
`
const movieInfoText = css`
  max-width: 340px;
  max-height: 100px;
  overflow: auto;
  white-space: pre-line;
  word-break: break-all;
  font-size: 15px;
  margin: 6px 0 8px 0;
  padding: 8px 12px;
  background: #fafbfc;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  color: #333;
`
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
const movieModalFooter = css`
  display: flex;
  gap: 18px;
  justify-content: flex-end;
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
  justify-content: center;
  margin-top: 8px;
`

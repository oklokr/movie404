import { css } from "@emotion/react"
import { Button, Divider, IconButton, InputBase, Paper, TextField } from "@mui/material"

import { useEffect, useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import { useSearch } from "@/component/searchProvider"

export default function SearchForm({ state, fn_handleOepnSearch }) {
  const [keyword, setKeyword] = useState("")
  const [activeState, setActiveState] = useState(false)
  useEffect(() => setActiveState(state))
  const { showSearchList, searchPostForm } = useSearch()

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      showSearchList({ keyword: keyword, genreTpcd: searchPostForm.genreTpcd })
    }
  }

  return (
    <div className={`search-wrap ${activeState ? "active" : ""}`} css={searchStyle}>
      <Paper sx={{ p: "2px 0", display: "flex", alignItems: "center" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색어를 입력해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleEnter}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => showSearchList({ keyword: keyword })}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={() => fn_handleOepnSearch()}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

const searchStyle = css`
  display: flex;
  align-items: center;
  width: 0;
  height: 100%;
  position: absolute;
  right: 88px;
  transition: 0.3s;
  z-index: 2;

  &.active {
    width: calc(100% - 216px);
  }

  .MuiPaper-root {
    width: 100%;
    height: fit-content;
    box-shadow: initial;
    border: 1px solid rgba(0, 0, 0, 0.54);
  }
`

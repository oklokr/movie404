import { Button } from "@mui/material"
import { css } from "@emotion/react"

export default function popMovieDetail(props) {
  return (
    <>
      <div css={topContentStyle}>
        {props.targetItem.teaser != null ? (
          <iframe
            width="100%"
            height="100%"
            src={props.targetItem.teaser}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        ) : (
          <span>
            <img src={props.targetItem.background} alt={props.targetItem.movieName} />
          </span>
        )}
      </div>
      <ul css={genreListStyle}>
        {props.genreList.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <dl css={infoStyle}>
        <dt>{props.targetItem.movieName}</dt>
        <dd>{props.targetItem.synopsis}</dd>
      </dl>
      <div css={btnWrapStyle}>
        <Button variant="contained" size="large">
          DVD구매하기
        </Button>
        <Button variant="contained" size="large">
          영화 예매하기
        </Button>
      </div>
    </>
  )
}
const topContentStyle = css`
  margin: -32px -32px 0 -32px;
  height: 500px;

  span,
  iframe {
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`
const genreListStyle = css`
  display: flex;
  list-style: none;
  gap: 8px;
  padding: 0;
  margin: 20px 0 0;

  li {
    font-size: 14px;
    padding: 2px 8px;
    border-radous: 12px;
    background: #ddd;
  }
`
const infoStyle = css`
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  dt {
    font-weight: bold;
  }

  dd {
    margin: 8px 0 0 0;
  }
`
const btnWrapStyle = css`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  margin-top: 20px;
`

import { Outlet, NavLink } from "react-router-dom"

function Community() {
  const linkStyle = {
    textDecoration: "none",
    fontWeight: 500,
    color: "#333",
  }
  const activeStyle = {
    color: "#0078d4",
    fontWeight: 700,
  }

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Arial, sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "220px",
          borderRight: "1px solid #ddd",
          background: "#fff",
          padding: "32px 24px",
        }}
      >
        <h1 style={{ fontSize: "22px", marginBottom: "32px", letterSpacing: "-1px" }}>고객센터</h1>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "18px" }}>
            <NavLink
              to="/community/notice"
              style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
              end
            >
              공지사항
            </NavLink>
          </li>
          <li style={{ marginBottom: "18px" }}>
            <NavLink
              to="/community/qna"
              style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
            >
              1:1 문의
            </NavLink>
          </li>
          <li style={{ marginBottom: "18px" }}>
            <NavLink
              to="/community/faq"
              style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
            >
              자주 묻는 질문
            </NavLink>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Community

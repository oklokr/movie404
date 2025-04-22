const authorizations = {
  getToken: localStorage.getItem("token"),
  removeToken: localStorage.setItem("token", ""),
}

export default authorizations

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { api } from '@utils/network.js'
import Cookies from "js-cookie"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

<<<<<<< HEAD
  const setAuth = () => {
    setIsLogin(true)
=======
  const setAuth = status => {
    Cookies.set("user", status, {path:'/'})
    setIsLogin(status)
>>>>>>> f50e726 (AuthProvide 변경)
    navigate("/")
  }

  const clearAuth = () => {
<<<<<<< HEAD
    api.post("/logout")
      .then(res => {
        if (res.data.status) {
          alert(res.data.msg)
          setIsLogin(false)
          navigate("/")
        }
      })

=======
    Cookies.remove("user")
    setIsLogin(false)
    navigate("/")
>>>>>>> f50e726 (AuthProvide 변경)
  }

  const removeAuth = () => {
    clearAuth(false)
  }

  const checkAuth = () => {
<<<<<<< HEAD
    return localStorage.getItem("user") ? true : false
=======
    return Cookies.get("user") ? true : false
    //db에 맞는 user정보가 있으면 true
>>>>>>> f50e726 (AuthProvide 변경)
  }

  useEffect(() => {
    if (localStorage.getItem("user")) setIsLogin(true)
  }, [])

  return (
    <AuthContext.Provider value={{ isLogin, setAuth, removeAuth, clearAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
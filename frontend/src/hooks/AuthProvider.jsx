import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { api } from '@utils/network.js'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  const setAuth = status => {
    cookieStore.setItem("user", status)
    // db에 회원정보 넣기
    setIsLogin(status)
    navigate("/")
  }

  const clearAuth = () => {
    cookieStore.removeItem("user")
    setIsLogin(false)
    navigate("/")
  }

  const removeAuth = () => {
    clearAuth()
  }

  const checkAuth = () => {
    return cookieStore.getItem("user") ? true : false
    //db에 맞는 user정보가 있으면 true
  }

  useEffect(() => {
    if(localStorage.getItem("user")) setIsLogin(true)
  }, [])

  return (
    <AuthContext.Provider value={{ isLogin, setAuth, removeAuth, clearAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
import { Language } from "@mui/icons-material"
import React from "react"
import { useState, createContext } from "react"
const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  id: "",
  name: "",
  verified: "",
  email: "",
  avatar: "",
  phone: "",
  role: "",
  lang: "",
  langHandlers: () => {},
  login: (token, id) => {},
  logout: () => {},
})

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token")
  const [token, SetToken] = useState(initialToken)

  const initialid = localStorage.getItem("id")
  const [id, Setid] = useState(initialid)

  const initialEmail = localStorage.getItem("email")
  const [email, SetEmail] = useState(initialEmail)

  const initialAvatar = localStorage.getItem("avatar")
  const [avatar, SetAvatar] = useState(initialAvatar)

  const initialPhone = localStorage.getItem("phone")
  const [phone, SetPhone] = useState(initialPhone)

  const initialRole = localStorage.getItem("role")
  const [role, SetRole] = useState(initialRole)

  const initialName = localStorage.getItem("name")
  const [name, SetName] = useState(initialName)

  const initialVerified = localStorage.getItem("verified")
  const [verified, SetVerified] = useState(initialVerified)

  const initialLang = localStorage.getItem("Lang")

  const Arabic = !!initialLang

  const UserIsLoggedIn = !!token

  const langHandler = () => {
    const isArabic = localStorage.getItem("Lang")
    console.log(isArabic)
    if (isArabic === "true") {
      console.log(isArabic)
      localStorage.removeItem("Lang")
      return null
    } else {
      console.log(isArabic)
      localStorage.removeItem("Lang")
      localStorage.setItem("Lang", "true")
      return true
    }
  }

  const loginHandler = (
    token,
    id,
    name,
    email,
    verified,
    role,
    phone,
    avatar
  ) => {
    SetToken(token)
    SetToken(id)
    SetEmail(email)
    SetName(name)
    SetVerified(verified)
    SetRole(role)
    SetPhone(phone)
    SetAvatar(avatar)
    console.log(token)
    localStorage.setItem("token", token)
    localStorage.setItem("id", id)

    localStorage.setItem("email", email)
    localStorage.setItem("name", name)
    localStorage.setItem("verified", verified)
    localStorage.setItem("role", role)
    localStorage.setItem("phone", phone)
    localStorage.setItem("avatar", avatar)
  }

  const logOutHandler = () => {
    SetToken(null)
    Setid(null)
    SetEmail(null)
    SetName(null)
    SetVerified(null)
    SetRole(null)
    SetPhone(null)
    SetAvatar(null)
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("email")
    localStorage.removeItem("name")
    localStorage.removeItem("verified")
    localStorage.removeItem("role")
    localStorage.removeItem("phone")
    localStorage.removeItem("avatar")
  }

  const contextValue = {
    token: token,
    id: id,
    name: name,
    verified: verified,
    email: email,
    avatar: avatar,
    phone: phone,
    role: role,
    isLoggedIn: UserIsLoggedIn,
    lang: Arabic,
    langHandlers: langHandler,
    login: loginHandler,
    logout: logOutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthContext

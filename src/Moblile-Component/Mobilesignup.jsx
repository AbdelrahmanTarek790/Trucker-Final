import * as React from "react"
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import AuthContext from "../store/auth-context"
import Alert from "@mui/material/Alert"
import logo from "../Images/Logo.png"
import pic from "../Images/flat-design-transport-truck-delivery_23-2149146360.png"
import Particles from "../Component/particles"
import { useTranslation } from "react-i18next"
export default function Mobilesignup() {
  const { t } = useTranslation()
  const history = useHistory()
  const [isShowPassword, SetisShowPassword] = useState(false)
  const [isPassword, SetisPassword] = useState("password")
  const ShowPass = () => {
    if (isShowPassword) {
      SetisShowPassword(false)
      SetisPassword("password")
    } else {
      SetisShowPassword(true)
      SetisPassword("text")
    }
  }

  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)
  const [isLoading, SetisLoading] = React.useState(false)
  const [enterdnamess, setnameChange] = useState("")
  const [msgError, setmsgError] = useState("")
  const nameChangeHandler = (event) => {
    setnameChange(event.target.value)
  }
  const hand = () => {
    setLang(Authcont.langHandlers())
    console.log(Language)
    setTimeout(() => {
      window.location = Language ? "/ar/register" : "/en/register"
    }, 500)
  }
  const EnteredPhone = React.useRef()
  const Enterednameref = React.useRef()
  const emailinputRef = React.useRef()
  const passwordinputRef = React.useRef()
  const conpasswordinputRef = React.useRef()

  const [iserror, Setiserroe] = React.useState(true)

  const Submithandler = async (event) => {
    event.preventDefault()
    Setiserroe(true)
    SetisLoading(true)
    const EPhone = EnteredPhone.current.value
    const EnteredName = Enterednameref.current.value
    const EneredEmail = emailinputRef.current.value
    const EnterdPassword = passwordinputRef.current.value
    const EnteredConpass = conpasswordinputRef.current.value

    const name = EnteredName
    const email = EneredEmail
    const password = EnterdPassword
    const passwordConfirm = EnteredConpass
    const phone = EPhone

    const response = await fetch(
      "https://cute-cyan-coyote-fez.cyclic.app/api/v1/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm,
          phone,
        }),
      }
    )
    const data = await response.json()
    console.log(data)
    SetisLoading(false)

    if (data.status === "success") {
      Authcont.login(data.token, data.user._id)
      Setiserroe(true)
      history.replace("/")
      SetisLoading(false)
    }
    if (data.status === "fail") {
      Setiserroe(false)
      SetisLoading(false)
      setmsgError(data.error.errors.name.message)
      console.log(msgError)
    }

    if (data.status === "error") {
      if (EnteredName.length === 0) {
        setmsgError(data.error.errors.name.message)
        SetisLoading(false)
        Setiserroe(false)
        console.log(msgError)
        return
      } else if (EneredEmail.length === 0) {
        setmsgError(data.error.errors.email.message)
        SetisLoading(false)
        Setiserroe(false)
        console.log(msgError)
        return
      } else if (EnterdPassword.length === 0) {
        setmsgError(data.error.errors.password.message)
        SetisLoading(false)
        Setiserroe(false)
        console.log(msgError)
        return
      } else if (EnterdPassword !== EnteredConpass) {
        setmsgError(data.error.errors.passwordConfirm.message)
        SetisLoading(false)
        Setiserroe(false)
        console.log(msgError)
        return
      } else {
        setmsgError(data.message)
        SetisLoading(false)
        Setiserroe(false)

        console.log(msgError)
      }
    }
  }

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="flexcontainer" style={{ display: "flex" }}>
            <div style={{ position: "relative" }} className="wrap-login100">
              <form
                style={
                  !Language ? { textAlign: "right" } : { textAlign: "left" }
                }
                className="login100-form validate-form"
                onSubmit={Submithandler}
              >
                <span className="login100-form-title p-b-26">
                  {t("Welcome")}
                </span>

                <span className="login100-form-title p-b-48">
                  <i className="zmdi zmdi-font"></i>
                </span>
                {!iserror && (
                  <Alert style={{ marginBottom: "10px" }} severity="error">
                    {msgError}
                  </Alert>
                )}
                {/* <p
                        style={{
                           color: "red",
                           display: iserror ? "none" : "block",
                        }}
                     >
                        {!iserror ? `${msgError}` : ""}
                     </p> */}
                <br></br>

                <div className="wrap-input100 validate-input">
                  <input
                    style={
                      !Language ? { textAlign: "right" } : { textAlign: "left" }
                    }
                    className="input100"
                    type="text"
                    value={enterdnamess}
                    name="Full Name"
                    ref={Enterednameref}
                    onChange={nameChangeHandler}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder={t("Fullname")}
                  ></span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    style={
                      !Language ? { textAlign: "right" } : { textAlign: "left" }
                    }
                    className="input100"
                    type="text"
                    name="Phone"
                    ref={EnteredPhone}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder={t("Mobile")}
                  ></span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    style={
                      !Language ? { textAlign: "right" } : { textAlign: "left" }
                    }
                    className="input100"
                    type="text"
                    name="email"
                    ref={emailinputRef}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder={t("Email")}
                  ></span>
                </div>

                <div className="wrap-input100 validate-input">
                  <span
                    style={!Language ? { marginRight: "250px" } : {}}
                    className="btn-show-pass"
                    onClick={ShowPass}
                  >
                    {!isShowPassword && (
                      <i className="fa-solid fa-eye" onClick={ShowPass}></i>
                    )}
                    {isShowPassword && (
                      <i
                        className="fa-solid fa-eye-slash"
                        onClick={ShowPass}
                      ></i>
                    )}
                  </span>
                  <input
                    style={
                      !Language ? { textAlign: "right" } : { textAlign: "left" }
                    }
                    className="input100"
                    type={isPassword}
                    name="pass"
                    ref={passwordinputRef}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder={t("password")}
                  ></span>
                </div>
                <div className="wrap-input100 validate-input">
                  <span
                    style={!Language ? { marginRight: "250px" } : {}}
                    className="btn-show-pass"
                    onClick={ShowPass}
                  >
                    {!isShowPassword && (
                      <i className="fa-solid fa-eye" onClick={ShowPass}></i>
                    )}

                    {isShowPassword && (
                      <i
                        className="fa-solid fa-eye-slash"
                        onClick={ShowPass}
                      ></i>
                    )}
                  </span>
                  <input
                    style={
                      !Language ? { textAlign: "right" } : { textAlign: "left" }
                    }
                    className="input100"
                    type={isPassword}
                    name="conpass"
                    ref={conpasswordinputRef}
                  />
                  <span
                    className="focus-input100"
                    data-placeholder={t("confirmpass")}
                  ></span>
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    {!isLoading && <div className="login100-form-bgbtn"></div>}
                    {!isLoading && (
                      <button className="login100-form-btn">
                        {t("Register")}
                      </button>
                    )}

                    {isLoading && (
                      <center>
                        <div className="loader"></div>
                      </center>
                    )}
                  </div>
                </div>
                <div className="text-center p-t-20">
                  <Link
                    style={{ fontWeight: "bold" }}
                    className="txt2"
                    to={`/${!Language ? "ar" : "en"}/forget`}
                  >
                    {t("forget")}
                  </Link>
                </div>
                <div className="text-center p-t-100">
                  <span className="txt2">{t("yaacc")}</span>

                  <Link
                    style={{ fontWeight: "bold" }}
                    className="txt2"
                    to={`/${!Language ? "ar" : "en"}/login`}
                  >
                    {t("Auth2")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

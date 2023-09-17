import React, { useContext, useState, useRef } from "react"

import { Link, useHistory } from "react-router-dom"
import AuthContext from "../store/auth-context"
import Alert from "@mui/material/Alert"
import Particles from "../Component/particles"
import { useTranslation } from "react-i18next"
export default function MobileSignIn() {
  const emailinputRef = useRef()
  const { t } = useTranslation()
  const history = useHistory()
  const passwordinputRef = useRef()
  const [msgError, setmsgError] = useState("")
  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)
  const [isLoading, SetisLoading] = useState(false)
  const [isShowPassword, SetisShowPassword] = useState(false)
  const [isPassword, SetisPassword] = useState("password")
  const [iserror, Setiserroe] = useState(true)

  const hand = () => {
    setLang(Authcont.langHandlers())
    console.log(Language)
    setTimeout(() => {
      window.location = Language ? "/ar/login" : "/en/login"
    }, 0)
  }
  const ShowPass = () => {
    if (isShowPassword) {
      SetisShowPassword(false)
      SetisPassword("password")
    } else {
      SetisShowPassword(true)
      SetisPassword("text")
    }
  }
  // const[isLogin,SetisLogin]=useState(true);
  const Submithandler = (event) => {
    event.preventDefault()
    Setiserroe(true)
    const EneredEmail = emailinputRef.current.value
    const EnterdPassword = passwordinputRef.current.value
    SetisLoading(true)
    console.log(EneredEmail)
    console.log(EnterdPassword)

    fetch("https://cute-cyan-coyote-fez.cyclic.app/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${EneredEmail}`,
        password: `${EnterdPassword}`,
        retrunSecureToken: true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            console.log(data.error.statusCode)

            if (data.status === "fail") {
              Setiserroe(false)
              SetisLoading(false)
              setmsgError(data.message)
              console.log(msgError)
            } else {
              Setiserroe(true)
            }
            SetisLoading(false)
          })
        }
        return response.json()
      })
      .then((data) => {
        if (data.status === "error") {
          Setiserroe(false)
          SetisLoading(false)
          setmsgError(data.message)
          console.log(msgError)
        }

        if (data.status === "success") {
          console.log(data)

          if (EneredEmail.length === 0) {
            SetisLoading(false)
            Setiserroe(false)
            setmsgError(data.message)

            console.log(msgError)
            return
          } else if (EnterdPassword.length === 0) {
            SetisLoading(false)
            Setiserroe(false)
            setmsgError(data.message)
            console.log(msgError)
            return
          } else if (data.message === "Signed in successfully") {
            // history.replace("/ar/")
            history.replace("/")
            Setiserroe(true)
            console.log(data)
            Authcont.login(data.token, data.id)
            SetisLoading(false)
            // SetisLogin(false);
          } else if (data.error.statusCode === 200) {
            SetisLoading(false)
            Setiserroe(false)
            setmsgError(data.message)
            console.log(msgError)
            return
          }

          // process the sign in response data
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error)
        SetisLoading(false)
      })
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
                  {t("Welcomeback")}
                </span>
                <span className="login100-form-title p-b-48">
                  <i className="zmdi zmdi-font"></i>
                </span>

                {!iserror && (
                  <Alert style={{ marginBottom: "10px" }} severity="error">
                    {msgError}
                  </Alert>
                )}
                <br></br>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid email is: a@b.c"
                >
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

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter password"
                >
                  <span
                    style={
                      !Language
                        ? { marginRight: "250px" }
                        : { marginRight: "0px" }
                    }
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

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    {!isLoading && <div className="login100-form-bgbtn"></div>}
                    {!isLoading && (
                      <button className="btnfrr login100-form-btn">
                        {t("Auth")}
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

                <div className="text-center p-t-115">
                  <span className="txt2">{t("noacc")}</span>

                  <Link
                    style={{ fontWeight: "bold" }}
                    className="txt2"
                    to={`/${!Language ? "ar" : "en"}/register`}
                  >
                    {t("Register")}
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

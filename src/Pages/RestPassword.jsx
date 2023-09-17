import * as React from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { useContext, useRef, useState } from "react"
import ConstContext from "../store/const-context"
import Alert from "@mui/material/Alert"
import { ToastContainer, toast } from "react-toastify"
import Particles from "../Component/particles"
import { useTranslation } from "react-i18next"
import AuthContext from "../store/auth-context"
const Rest = () => {
  const { t } = useTranslation()
  let { userId } = useParams()
  const [msgError, setmsgError] = useState("")
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const history = useHistory()
  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)
  const passwordinputRef = useRef()
  const conpasswordinputRef = useRef()
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
  const [isLoading, SetisLoading] = useState(false)
  const [iserror, Setiserroe] = useState(true)
  const Submithandler = (event) => {
    event.preventDefault()
    Setiserroe(true)
    const EnterdPassword = passwordinputRef.current.value
    const EnteredConpass = conpasswordinputRef.current.value
    SetisLoading(true)

    fetch(`${Constant[0].url}/api/v1/users/resetPassword/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: `${EnterdPassword}`,
        passwordConfirm: `${EnteredConpass}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            if (data.error.statusCode === 500) {
              setmsgError("Your token has been expire")
            }
            Setiserroe(false)
            SetisLoading(false)
          })
        }
        return response.json()
      })
      .then((data) => {
        if (data.status === "success") {
          toast.success(
            "Your password has been changed successfully you may login now !"
          )
          SetisLoading(false)
          setTimeout(() => {
            history.replace(`/${!Language ? "ar" : "en"}/login`)
          }, 3000)
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error)
      })
  }
  return (
    <div>
      <Particles></Particles>
      <ToastContainer
        style={{ marginTop: "50px" }}
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        pauseOnHover
      />
      <div className="limiter">
        <div className="container-login100">
          <div style={{ position: "relative" }} className="wrap-login100">
            <form
              style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
              className="login100-form validate-form"
              onSubmit={Submithandler}
            >
              <span className="login100-form-title p-b-15">
                {t("ResetPassword")}
              </span>
              <span className="login100-form-title p-b-30">
                <i className="zmdi zmdi-font"></i>
              </span>

              {!iserror && (
                <Alert style={{ marginBottom: "10px" }} severity="error">
                  {msgError}
                </Alert>
              )}
              <br></br>

              <div className="wrap-input100 validate-input">
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
                    <i
                      className="fa-solid fa-eye"
                      onClick={ShowPass}
                      style={{ right: "0px" }}
                    ></i>
                  )}

                  {isShowPassword && (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={ShowPass}
                      style={{ right: "0px" }}
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
                  style={
                    !Language
                      ? { marginRight: "250px" }
                      : { marginRight: "0px" }
                  }
                  className="btn-show-pass"
                  onClick={ShowPass}
                >
                  {!isShowPassword && (
                    <i
                      className="fa-solid fa-eye"
                      onClick={ShowPass}
                      style={{ right: "0px" }}
                    ></i>
                  )}

                  {isShowPassword && (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={ShowPass}
                      style={{ right: "0px" }}
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
                    <button
                      style={{ fontFamily: "inherit" }}
                      className="login100-form-btn"
                    >
                      {t("changepass")}
                    </button>
                  )}

                  {isLoading && (
                    <center>
                      <div className="loader"></div>
                    </center>
                  )}
                </div>
              </div>
              <div className="text-center p-t-100">
                <span className="txt2">{t("yaacc")}</span>

                <Link
                  style={{ fontWeight: "bold" }}
                  className="txt2"
                  to={`/${!Language ? "ar" : "en"}/login`}
                >
                  {t("Auth")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rest

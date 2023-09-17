import React, { useContext, useState, useRef } from "react"
import ConstContext from "../store/const-context"
import Alert from "@mui/material/Alert"
import { ToastContainer, toast } from "react-toastify"
import { Link } from "react-router-dom"
import AuthContext from "../store/auth-context"
import { useTranslation } from "react-i18next"
const Mobileforgetpassword = () => {
  const { t } = useTranslation()
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const emailinputRef = useRef()
  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)
  const [isLoading, SetisLoading] = useState(false)
  const [iserror, Setiserroe] = useState(true)
  const Submithandler = (event) => {
    event.preventDefault()
    Setiserroe(true)
    const EneredEmail = emailinputRef.current.value
    SetisLoading(true)

    fetch(`${Constant[0].url}/api/v1/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${EneredEmail}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            console.log(data.error.statusCode)

            // if (data.status === "fail") {
            //    Setiserroe(false)
            //    SetisLoading(false)
            //    setmsgError(data.message)
            //    console.log(msgError)
            // } else {
            //    Setiserroe(true)
            // }
            // SetisLoading(false)
          })
        }
        return response.json()
      })
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message)
          SetisLoading(false)
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error)
      })
  }
  return (
    <div>
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
              <span className="login100-form-title p-b-15">{t("forget")}</span>
              <span className="login100-form-title p-b-30">
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

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  {!isLoading && <div className="login100-form-bgbtn"></div>}
                  {!isLoading && (
                    <button
                      style={{ fontFamily: "inherit" }}
                      className="login100-form-btn"
                    >
                      {t("Sendreq")}
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

export default Mobileforgetpassword

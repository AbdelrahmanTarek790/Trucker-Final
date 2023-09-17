import React, { useContext, useState } from "react"
import "./css/signin.css"
import ConstContext from "../store/const-context"
import Alert from "@mui/material/Alert"
import { ToastContainer, toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import Particles from "../Component/particles"
import AuthContext from "../store/auth-context"
import { useTranslation } from "react-i18next"
import OTPInput from "react-otp-input"
import axios from "axios"
const VerifyScreen = () => {
  const [otp, setOtp] = useState("")
  const history = useHistory()

  const { t } = useTranslation()
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const [msgError, setMsgError] = useState("")
  const authCtx = useContext(AuthContext)
  const [Language, setLang] = useState(authCtx.lang)
  const [isLoading, SetisLoading] = useState(false)

  const [iserror, Setiserroe] = useState(true)
  if (authCtx.id === null) {
    window.location.reload(true)
  }
  const token = authCtx.token
  if (authCtx.isLoggedIn) {
  } else {
    history.replace("/")
  }

  const ResendHandler = () => {
    fetch(`${Constant[0].url}/api/v1/users/sendOtpAgain`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res)
        toast.success("New OTP have been sent to your email")
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const Submithandler = (event) => {
    event.preventDefault()
    Setiserroe(true)
    SetisLoading(true)

    axios
      .post(
        `${Constant[0].url}/api/v1/users/verfiy`,
        {
          otpCode: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        localStorage.removeItem("verified")
        toast.success("Your account has been verified successfully")
        SetisLoading(false)
        localStorage.setItem("verified", "true")
        setTimeout(() => {
          window.location.reload(true)
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
        setMsgError(error.response.data.message)

        Setiserroe(false)
        SetisLoading(false)
      })
  }

  const [emailStar, setEmailStar] = useState(authCtx.email.substring(0, 3))

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
          <div
            style={{ position: "relative", borderRadius: "10px" }}
            className="wrap-login100"
          >
            <p
              onClick={() => {
                authCtx.logout()
              }}
              style={{
                position: "absolute",
                left: "33px",
                top: "20px",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Logout
            </p>

            <form
              style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
              className="login100-form validate-form"
              onSubmit={Submithandler}
            >
              <span className="login100-form-title p-b-15">
                OTP Verification
              </span>
              <center>
                <h5>
                  Enter the OTP you received at {emailStar}**********.com{" "}
                </h5>
              </center>
              {/* <span className="login100-form-title p-b-30">
                <i className="zmdi zmdi-font"></i>
              </span> */}

              {!iserror && (
                <Alert
                  style={{ marginBottom: "10px", textAlign: "left" }}
                  severity="error"
                >
                  {msgError}
                </Alert>
              )}

              {/* <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input
                  style={
                    !Language ? { textAlign: "right" } : { textAlign: "left" }
                  }
                  className="input100"
                  type="text"
                  ref={emailinputRef}
                />
                <span
                  className="focus-input100"
                  data-placeholder="Enter The code"
                ></span>
              </div> */}
              <center>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  containerStyle={{
                    justifyContent: "center",
                    columnGap: "5px",
                    height: "150px",
                  }}
                  inputStyle={{
                    width: "50px",
                    height: "50px",
                    border: "1px solid rgb(223, 222, 222)",
                    borderRadius: "5px",
                    paddingBottom: "3px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
              </center>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  {!isLoading && <div className="login100-form-bgbtn"></div>}
                  {!isLoading && (
                    <button
                      style={{ fontFamily: "inherit" }}
                      className="login100-form-btn"
                    >
                      Validate{/* {t("Sendreq")} */}
                    </button>
                  )}

                  {isLoading && (
                    <center>
                      <div className="loader"></div>
                    </center>
                  )}
                </div>
                <a
                  onClick={ResendHandler}
                  style={{ marginTop: "12px", cursor: "pointer" }}
                >
                  ResendOTP
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyScreen

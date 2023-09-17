import * as React from "react"
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import AuthContext from "../store/auth-context"
import Alert from "@mui/material/Alert"
import { useTranslation } from "react-i18next"
import axios from "axios"
import ConstContext from "../store/const-context"
import PopupNatid from "./PopupNatid"
import { toast } from "react-toastify"

const ServiceProvider = (props) => {
  const { t } = useTranslation()

  const date = new Date()
  // console.log(date.getFullYear())
  const [isOpen, setIsOpen] = useState(false)

  const [ocrDone, setOcrDone] = useState(false)

  const [natId, setNatId] = useState(["", ""])

  const [expDate, setExpDate] = useState("")

  const handerData = (AppjsData) => {
    if (AppjsData === "error") {
      console.log(AppjsData)
      toast.error("Please Try another photo with high quality")
    } else {
      setNatId(AppjsData)
      console.log(natId)
      setOcrDone(true)
      setIsOpen(false)
    }
    console.log(AppjsData)
  }

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

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
  const Constant = useContext(ConstContext)

  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)
  const [isLoading, SetisLoading] = React.useState(false)
  const [enterdnamess, setnameChange] = useState("")
  const [msgError, setmsgError] = useState("")
  const nameChangeHandler = (event) => {
    setnameChange(event.target.value)
  }

  const EnteredPhone = React.useRef()
  const Enterednameref = React.useRef()
  const emailinputRef = React.useRef()
  const passwordinputRef = React.useRef()
  const conpasswordinputRef = React.useRef()
  const EnteredNatID = React.useRef()
  const EnteredExpireDate = React.useRef()

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
    const EnteredNatIDs = EnteredNatID.current.value

    const name = EnteredName
    const email = EneredEmail
    const password = EnterdPassword
    const passwordConfirm = EnteredConpass
    const nationalId = EnteredNatIDs
    const phone = EPhone
    const role = "service_provider"
    console.log(nationalId)

    axios
      .post(`${Constant[0].url}/api/v1/users/signup`, {
        role: role,
        name: name,
        email: email,
        nationalId: nationalId,
        password: password,
        passwordConfirm: passwordConfirm,
        phone: phone,
      })
      .then((data) => {
        SetisLoading(false)
        console.log(data)
        Setiserroe(true)
        Authcont.login(
          data.data.token,
          data.data.user._id,
          data.data.user.name,
          data.data.user.email,
          data.data.user.verified,
          data.data.user.role,
          data.data.user.phone,
          data.data.user.avatar
        )
        window.location = !Language ? `/ar/verify/` : `/en/verify/`
        SetisLoading(false)
      })
      .catch((error) => {
        Setiserroe(false)
        SetisLoading(false)
        console.log(error)
        if (EnteredName.length === 0) {
          setmsgError(error.response.data.error.errors.name.message)
        } else if (EPhone.length === 0) {
          setmsgError(error.response.data.error.errors.phone.message)
        } else if (EneredEmail.length === 0) {
          setmsgError(error.response.data.error.errors.email.message)
        } else if (EnterdPassword.length === 0) {
          setmsgError(error.response.data.error.errors.password.message)
        } else if (EnterdPassword !== EnteredConpass) {
          setmsgError(error.response.data.error.errors.passwordConfirm.message)
        }
      })
  }
  return (
    <div>
      <span className="login100-form-title p-b-48">
        <i className="zmdi zmdi-font"></i>
      </span>
      {!iserror && (
        <Alert style={{ marginBottom: "10px" }} severity="error">
          {msgError}
        </Alert>
      )}

      <br></br>

      <div className="wrap-input100 validate-input">
        <input
          style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
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
          style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
          className="input100"
          type="text"
          maxLength={11}
          name="Phone"
          ref={EnteredPhone}
        />
        <span className="focus-input100" data-placeholder={t("Mobile")}></span>
      </div>
      <div className="wrap-input100 validate-input">
        <input
          style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
          disabled
          className="input100"
          value={natId[0]}
          type="text"
          name="NatID"
          ref={EnteredNatID}
        />
        <span className="focus-input100" data-placeholder="NatID"></span>
        {!ocrDone && (
          <div
            onClick={() => {
              setIsOpen(true)
            }}
            style={{
              position: "absolute",
              bottom: "5px",
              left: "7px",
              fontSize: "20px",
            }}
            className="camera"
          >
            <i
              style={{ marginTop: "10px" }}
              className="fa-solid fa-camera "
            ></i>
          </div>
        )}
      </div>
      <div className="wrap-input100 validate-input">
        <input
          style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
          disabled
          className="input100"
          value={natId[1]}
          type="text"
          name="expDate"
          ref={EnteredExpireDate}
        />
        <span className="focus-input100" data-placeholder="expDate"></span>
      </div>
      <div className="wrap-input100 validate-input">
        <input
          style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
          className="input100"
          type="text"
          name="email"
          ref={emailinputRef}
        />
        <span className="focus-input100" data-placeholder={t("Email")}></span>
      </div>

      <div className="wrap-input100 validate-input">
        <span
          style={!Language ? { marginRight: "236px" } : {}}
          className="btn-show-pass"
          onClick={ShowPass}
        >
          {!isShowPassword && (
            <i className="fa-solid fa-eye" onClick={ShowPass}></i>
          )}
          {isShowPassword && (
            <i className="fa-solid fa-eye-slash" onClick={ShowPass}></i>
          )}
        </span>
        <input
          style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
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
          style={!Language ? { marginRight: "236px" } : {}}
          className="btn-show-pass"
          onClick={ShowPass}
        >
          {!isShowPassword && (
            <i className="fa-solid fa-eye" onClick={ShowPass}></i>
          )}

          {isShowPassword && (
            <i className="fa-solid fa-eye-slash" onClick={ShowPass}></i>
          )}
        </span>
        <input
          style={!Language ? { textAlign: "right" } : { textAlign: "left" }}
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
            <button onClick={Submithandler} className="login100-form-btn">
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
      {isOpen && (
        <PopupNatid
          NatIdData={handerData}
          handleClose={togglePopup}
        ></PopupNatid>
      )}
    </div>
  )
}

export default ServiceProvider

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
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import axios from "axios"
import ConstContext from "../store/const-context"
import { useEffect } from "react"

const Customer = () => {
  const [Selected, setSelected] = useState("customer")
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

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
    const role = Selected

    axios
      .post(`${Constant[0].url}/api/v1/users/signup`, {
        role: role,
        name: name,
        email: email,
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
          maxLength={11}
          type="text"
          name="Phone"
          ref={EnteredPhone}
        />
        <span className="focus-input100" data-placeholder={t("Mobile")}></span>
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
          style={!Language ? { marginRight: "250px" } : {}}
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
          style={!Language ? { marginRight: "250px" } : {}}
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
    </div>
  )
}

export default Customer

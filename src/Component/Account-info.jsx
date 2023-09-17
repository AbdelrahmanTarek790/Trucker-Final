import { useContext, useEffect, useState, useRef } from "react"
import AuthContext from "../store/auth-context"
import ConstContext from "../store/const-context"
import CircularProgress from "@mui/material/CircularProgress"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { Avatar, Button } from "@mui/material"
import PopupProfile from "./PopupProfile"
const AccountInfo = () => {
  const { t } = useTranslation()
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const [disable, setDisable] = useState(true)
  const Fname = useRef()
  const Lname = useRef()
  const Password = useRef()
  const ConfPassword = useRef()
  const oldPassword = useRef()
  const PhoneNumber = useRef()
  const State = useRef()
  const [Subrl, setSubrl] = useState(false)
  const [Pass, setPass] = useState(true)

  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const EditHandler = () => {
    if (disable) {
      setDisable(false)
    } else {
      setDisable(true)
      Fname.current.value = user.fname
      Lname.current.value = user.lname
      PhoneNumber.current.value = user.phone
    }
  }

  const ChangePassword = () => {
    if (Pass) {
      setPass(false)
    } else {
      setPass(true)
    }
  }
  const SubmitHandler = () => {
    if (!Pass) {
      const password = Password.current.value
      const passwordConfirm = ConfPassword.current.value
      setSubrl(true)
      const oldPass = oldPassword.current.value

      fetch(`${Constant[0].url}/api/v1/users/updatePassword/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: JSON.stringify({
          oldPassword: `${oldPass}`,
          newPassword: `${password}`,
          newPasswordConfirm: `${passwordConfirm}`,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            response.json().then((data) => {
              if (data.error.statusCode === 401) {
                toast.error(
                  "You need to logout and login again to change the password again "
                )
                setSubrl(false)
                setPass(true)
              }
              // Setiserroe(false)
              // SetisLoading(false)
            })
          }
          return response.json()
        })
        .then((data) => {
          console.log(data)
          if (data.status === "success") {
            toast.success("Your password has been changed successfully !")
            setSubrl(false)
            setPass(true)
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error)
        })
    } else if (!disable) {
      const name = Fname.current.value + " " + Lname.current.value
      console.log(name)
      setSubrl(true)
      const phone = PhoneNumber.current.value
      const formData = new FormData()
      if (photo === null) {
      } else {
        formData.append("avatar", photo)
      }
      formData.append("name", name)
      formData.append("email", user.email)
      formData.append("phone", phone)
      formData.append("active", true)

      axios
        .put(`${Constant[0].url}/api/v1/users/updateMe/`, formData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authCtx.token}`,
          },
        })
        .then((res) => {
          setSubrl(false)
          console.log(res)
          if (res.data.status === "success") {
            window.location.reload(true)
          } else if (res.data.error.statusCode === 401) {
            setDisable(true)
            Fname.current.value = user.fname
            Lname.current.value = user.lname
            PhoneNumber.current.value = user.phone
            toast.error(res.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          setDisable(true)
          setSubrl(false)
          Fname.current.value = user.fname
          Lname.current.value = user.lname
          PhoneNumber.current.value = user.phone
          toast.error(
            "You need to logout and login again to change the account info"
          )
        })
    }
  }

  const [user, setUser] = useState([
    {
      name: "",
      fname: "",
      lname: "",
      email: "",
      avatar: "",
      phone: "",
    },
  ])

  const [photo, setPhoto] = useState(null)
  const onChangePhoto = (event) => {
    console.log(event.target.files[0])
    setPhoto(event.target.files[0])
    console.log(photo)
    setIsOpen(!isOpen)
  }

  const [IsReload, SetIsRaload] = useState(false)
  const [selects, setSelects] = useState()
  useEffect(() => {
    fetch(
      `https://cute-cyan-coyote-fez.cyclic.app/api/v1/users/${authCtx.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        SetIsRaload(true)
        setUser(data.user)
        setUser({
          name: data.user.name,
          fname: data.user.name.split(" ")[0],
          lname: data.user.name.split(" ")[1],
          email: data.user.email,
          phone: data.user.phone,
          avatar: data.user.avatar,
        })
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error)
      })
  }, [authCtx.id])

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
      {!IsReload && (
        <div>
          <CircularProgress style={{ marginTop: "23%", color: "#ffbc00" }} />{" "}
          <br />
        </div>
      )}
      {IsReload && (
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right" style={{ width: "30%" }}>
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <div className="profile-pic">
                  {isOpen && (
                    <PopupProfile items={user} handleClose={togglePopup} />
                  )}
                  {/* <input
                    className="inputavatar"
                    id="file"
                    type="file"
                    name="avatar"
                    onChange={onChangePhoto}
                  /> */}
                  <Avatar
                    className="imgAvatar"
                    id="output"
                    alt={user.name}
                    src={
                      user.avatar === null ? "/broken-image.jpg" : user.avatar
                    }
                    sx={{ width: 150, height: 150, fontSize: 50 }}
                  />
                  {/* <img
                    className="imgAvatar"
                    src={user.avatar}
                    id="output"
                    width="200"
                  /> */}
                </div>
                <Button
                  variant="contained"
                  onClick={togglePopup}
                  style={{
                    backgroundColor: "#ffbc00",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {t("ChangePic")}
                </Button>

                <span className="font-weight-bold">{user.name}</span>
                <span className="text-black-50">{user.email}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right" style={{ width: "70%" }}>
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">{t("ProfileSettings")}</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">{t("FirstName")}</label>
                    <input
                      type="text"
                      ref={Fname}
                      disabled={disable ? true : false}
                      className="form-control"
                      placeholder="first name"
                      defaultValue={user.fname}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">{t("LastName")}</label>
                    <input
                      type="text"
                      ref={Lname}
                      disabled={disable ? true : false}
                      className="form-control"
                      placeholder="last name"
                      defaultValue={user.lname}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">{t("Mobile")}</label>
                    <input
                      type="tel"
                      ref={PhoneNumber}
                      disabled={disable ? true : false}
                      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                      className="form-control"
                      placeholder="010-6294-5625"
                      defaultValue={user.phone}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels">{t("Email")}</label>
                    <input
                      type="email"
                      disabled
                      className="form-control"
                      placeholder="enter your email"
                      defaultValue={user.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">{t("State")}</label>
                    <select
                      className="form-control"
                      value={selects}
                      disabled={disable ? true : false}
                      onChange={(e) => setSelects(e.target.value)}
                    >
                      <option>Cairo</option>
                      <option>Aswan</option>
                      <option>North sinai</option>
                      <option>New Valley</option>
                      <option>Matruh</option>
                      <option>Red Sea</option>
                      <option>Giza</option>
                      <option>South Sinai</option>
                      <option>Suez</option>
                      <option>Beheira</option>
                      <option>Helwan</option>
                      <option>Sharqia</option>
                      <option>Dakahlia</option>
                      <option>Kafr el-Sheikh</option>
                      <option>Alexandria</option>
                      <option>Monufia</option>
                      <option>Minya</option>
                      <option>Gharbia</option>
                      <option>Faiyum</option>
                      <option>Qena</option>
                      <option>Asyut</option>
                      <option>Sohag</option>
                      <option>Ismailia</option>
                      <option>Beni Suef</option>
                      <option>Qalyubia</option>
                      <option>Damietta</option>
                      <option>Port Said</option>
                      <option>Luxor</option>
                      <option>6th of October</option>
                    </select>
                  </div>
                </div>
                {disable && Pass && (
                  <div
                    className="mt-5  text-center"
                    style={{ marginRight: "45px" }}
                  >
                    <button
                      className="btn btn-primary profile-button"
                      type="submit"
                      style={{ marginRight: "50px" }}
                      onClick={ChangePassword}
                    >
                      {t("changepass")}
                    </button>
                    <button
                      className="btn btn-primary profile-button"
                      type="submit"
                      onClick={EditHandler}
                    >
                      {t("editprofile")}
                    </button>
                  </div>
                )}
                {!disable && (
                  <div
                    className="mt-5  text-center"
                    style={{ marginRight: "45px" }}
                  >
                    {!Subrl && (
                      <button
                        className="btn btn-primary profile-button"
                        type="submit"
                        onClick={SubmitHandler}
                        style={{ marginRight: "50px" }}
                      >
                        {t("submit")}
                      </button>
                    )}

                    {Subrl && !disable && (
                      <CircularProgress style={{ marginRight: "50px" }} />
                    )}

                    {!Subrl && (
                      <button
                        className="btn btn-primary profile-button"
                        type="submit"
                        onClick={EditHandler}
                      >
                        {t("cancel")}
                      </button>
                    )}
                  </div>
                )}
                {!Pass && (
                  <div className="col mt-5">
                    <h2>{t("changepass")}</h2>
                    <div className="col-md-6">
                      <label className="labels  ">Old Password</label>
                      <input
                        type="password"
                        autoComplete="new-password"
                        ref={oldPassword}
                        className="form-control mt-1"
                        placeholder="Enter your old password"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels  ">New Password</label>
                      <input
                        type="password"
                        ref={Password}
                        className="form-control mt-1"
                        placeholder="Enter your new password"
                      />
                    </div>
                    <div className="col-md-6  mt-3">
                      <label className="labels">Confirm New Password</label>
                      <input
                        type="password"
                        ref={ConfPassword}
                        className="form-control mt-1"
                        placeholder="Confirm your new password"
                      />
                    </div>
                    <div
                      className="mt-5  text-center"
                      style={{ marginRight: "45px" }}
                    >
                      {!Subrl && !Pass && (
                        <button
                          className="btn btn-primary profile-button"
                          type="submit"
                          onClick={SubmitHandler}
                          style={{ marginRight: "50px" }}
                        >
                          {t("change")}
                        </button>
                      )}

                      {Subrl && !Pass && (
                        <CircularProgress style={{ marginLeft: "1px" }} />
                      )}

                      {!Subrl && !Pass && (
                        <button
                          className="btn btn-primary profile-button"
                          type="submit"
                          onClick={ChangePassword}
                        >
                          {t("cancel")}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountInfo

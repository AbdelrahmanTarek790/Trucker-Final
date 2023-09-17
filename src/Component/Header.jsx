import React, { useContext, useEffect, useState } from "react"
import "./css/main.css"
import "./css/Nav.css"
import "bootstrap/dist/css/bootstrap.css"
import logo from "../Images/Logo.png"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useTranslation } from "react-i18next"
import "./css/LowP.css"

import { Link, useHistory } from "react-router-dom"
import AuthContext from "../store/auth-context"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import Mobile from "./mobile"

function Header() {
  const history = useHistory()
  const { t } = useTranslation()
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const logOutHandler = () => {
    setTimeout(function () {
      authCtx.logout()
      window.location.reload(true)
    }, 1000)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const [Language, setLang] = useState(authCtx.lang)

  const hand = () => {
    authCtx.langHandlers()
    const urls = window.location.pathname.split("/")
    setTimeout(() => {
      if (urls.length === 3) {
        window.location = Language ? `/ar/${urls[2]}` : `/en/${urls[2]}`
      } else if (urls.length === 2) {
        window.location = Language ? `/ar` : `/en`
      } else if (urls.length === 4) {
        window.location = Language
          ? `/ar/${urls[2]}/${urls[3]}`
          : `/en/${urls[2]}/${urls[3]}`
      }
    }, 500)
  }
  const IsID = authCtx.id
  const url = `https://cute-cyan-coyote-fez.cyclic.app/api/v1/users/${IsID}`

  if (isLoggedIn) {
    if (IsID === null) {
      window.location.reload(true)
    }
  }

  const [user, setUser] = useState({
    name: "",
    email: "",
    _id: "",
    avatar: "",
  })

  useEffect(() => {
    if (IsID === null) {
    } else {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setUser(data.user)
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error)
        })
    }
  }, [url])

  return (
    <div>
      <div
        id="ss"
        className="navbar  navbar-light Lowpage"
        style={{
          backgroundColor: "rgb(255 188 0)",
          padding: "0",
          position: "relative",
          zIndex: "100",
          boxShadow: "-1px 1px 11px black",
        }}
      >
        <div
          style={{
            marginLeft: "5%",
            marginRight: "1%",
            display: "flex",
            width: "100%",
            padding: "0",
            justifyContent: "flex-end",
            flexWrap: "nowrap",
          }}
          className="navbar  navbar-light"
        >
          {!isLoggedIn && (
            <div
              className=" Lowpage signinupcss "
              style={{ textAlign: "center", width: "10%" }}
            >
              <Link className="sign" to={`/${!Language ? "ar" : "en"}/login`}>
                <p
                  className="Arabic"
                  style={{ display: "inline", marginRight: "15px" }}
                >
                  {t("Auth")}
                </p>
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div
              className=" Lowpage"
              style={{
                textAlign: "center",
                marginRight: "20px",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginRight: "25px",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <IconButton style={{ borderRadius: "0px" }} aria-label="cart">
                  <ShoppingCartIcon
                    style={{
                      color: "black",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "15px",
                      marginBottom: "0rem",
                      color: "black",
                    }}
                    className="Arabic"
                  >
                    {t("Cart")}
                  </p>
                </IconButton>
              </div>

              <Box style={{ marginBottom: "5%" }} sx={{ flexGrow: 0 }}>
                <Tooltip title={t("OpenSet")}>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, mt: "6px" }}
                  >
                    <Avatar
                      alt={user.name}
                      src={
                        user.avatar === null ? "/broken-image.jpg" : user.avatar
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to={`/${!Language ? "ar" : "en"}/profile`}>
                    <MenuItem style={{ justifyContent: "flex-end" }}>
                      <Typography
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        textAlign="right"
                      >
                        <i className="fa-solid fa-user"></i> {t("profile")}
                      </Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem style={{ justifyContent: "flex-end" }}>
                    <Typography
                      style={{
                        color: "black",
                        fontWeight: "bold",
                      }}
                      textAlign="right"
                    >
                      <i className="fa-regular fa-heart"></i> {t("Favorite")}
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={logOutHandler}
                    style={{ justifyContent: "flex-end" }}
                  >
                    <Typography
                      style={{
                        color: "black",
                        fontWeight: "bold",
                      }}
                      textAlign="right"
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      {t("Logout")}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          )}
          <div className="Betweens"></div>
          <div style={{ textAlign: "center", marginLeft: "18px" }}>
            <p
              className="changelang ancor"
              onClick={hand}
              style={{
                fontFamily: "Cairo",
                marginBlockStart: "1em",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-language"></i> {t("Lang")}
            </p>
          </div>
          <div className="headerul">
            <ul
              style={{
                textAlign: "center",
                listStyle: "none",
                display: "flex",
                marginTop: "10px",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingInlineStart: "0px",
                marginBlockStart: "3px",
                marginBlockEnd: "0px",
              }}
            >
              <div className="Betweens max-w-fit"></div>
              <a
                className="ancor"
                style={{ color: "black", padding: "9px" }}
                href={"http://localhost:3000/"}
              >
                <li className="Arabic">{t("About")}</li>
              </a>
              <div className="Betweens"></div>
              <Link
                className="ancor"
                style={{ color: "black", padding: "9px" }}
                to={`/${!Language ? "ar" : "en"}/contact`}
              >
                <li className="Arabic">{t("Contact")}</li>
              </Link>
              <div className="Betweens"></div>

              <li className="Arabic ancor">
                <div className="dropdown">
                  <button className="dropbtn">{t("Explore")}</button>
                  <div className="dropdown-content">
                    <Link
                      style={{ color: "black" }}
                      to={`/${!Language ? "ar" : "en"}/explore`}
                    >
                      استكشف
                    </Link>
                    <a
                      style={{ color: "black" }}
                      href={"http://localhost:3000/"}
                    >
                      Link 2
                    </a>
                    <a
                      style={{ color: "black" }}
                      href={"http://localhost:3000/"}
                    >
                      Link 3
                    </a>
                  </div>
                </div>
              </li>
              <div className="Betweens"></div>
              <Link
                className="ancor"
                style={{ color: "black", padding: "9px" }}
                to={`/${!Language ? "ar" : "en"}`}
              >
                <li className="Arabic">
                  <i className="fa-solid fa-house"></i> {t("home")}
                </li>
              </Link>
            </ul>
          </div>
          <div
            className=""
            style={{
              height: "33px",
              width: "40%",
            }}
          >
            <input
              type="search"
              name="search"
              autoComplete="off"
              style={{
                width: "100%",
                textAlign: "right",
                borderRadius: "5px",
                height: "100%",
              }}
              placeholder="ما الذي تبحث عنه؟"
            ></input>
          </div>

          <Link
            style={{ width: "8%" }}
            className="mobile"
            to={`/${!Language ? "ar" : "en"}`}
          >
            <img
              src={logo}
              style={{ width: "100%" }}
              alt="netflix-font"
              border="0"
            />
          </Link>
        </div>
      </div>
      <div
        id="ss"
        className="navbar  navbar-light Howpage"
        style={{
          backgroundColor: "rgb(255 188 0)",
          padding: "0",
          position: "relative",
          zIndex: "100",
          boxShadow: "-1px 1px 11px black",
        }}
      >
        <div
          style={{
            marginRight: "1%",
            display: "flex",
            width: "100%",
            padding: "0",
            justifyContent: "center",
            flexWrap: "nowrap",
          }}
          className="navbar  navbar-light"
        >
          <img width="150px" src={logo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header

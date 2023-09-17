import * as React from "react"
import AuthContext from "../store/auth-context"
import { useState } from "react"
import { useContext } from "react"
import ConstContext from "../store/const-context"
import { useEffect } from "react"
import axios from "axios"
import MobileCards from "./MobileCards"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"

import MobileCardSkeleton from "./MobileCardSkeleton"

const MobileExplore = () => {
  const [value, setValue] = useState(0)
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const isLoggedIn = authCtx.isLoggedIn
  const [IsReload, SetIsReload] = useState(true)
  const logOutHandler = () => {
    setTimeout(function () {
      authCtx.logout()
      window.location.reload(true)
    }, 1000)
  }
  const { t } = useTranslation()
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [user, setUser] = useState({
    name: "",
    email: "",
    _id: "",
    avatar: "",
  })

  const [Items, setItems] = useState([
    {
      description: "",
      favourite: false,
      photo: "",
      price: "",
      rating: "",
      title: "",
      type: "",
    },
  ])

  const [Language, setLang] = useState(authCtx.lang)
  const IsID = authCtx.id
  useEffect(() => {
    if (IsID === null) {
    } else {
      axios
        .get(`${Constant[0].url}/api/v1/users/${IsID}`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        })
        .then((data) => {
          console.log(data)
          setUser(data.data.user)
          // process the sign in response data
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error)
        })
    }
    axios
      .get(`${Constant[0].url}/api/v1/truck`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
      .then((res) => {
        console.log(res)
        SetIsReload(false)
        setItems(res.data.equipment)
      })
      .catch((error) => {})
  }, [])
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f1f1f1",
        paddingBottom: "66px",
      }}
    >
      <div
        style={{
          display: "flex",
          paddingTop: "10px",
          height: "60px",
          marginTop: "6px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isLoggedIn && (
          <Box sx={{ flexGrow: 0, marginLeft: "10px" }}>
            <Tooltip title={t("OpenSet")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  style={{ width: "60px", height: "60px" }}
                  alt={user.name}
                  src={user.avatar === null ? "/broken-image.jpg" : user.avatar}
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
                  <i className="fa-solid fa-comment"></i> {t("chat")}
                </Typography>
              </MenuItem>
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
        )}

        {!isLoggedIn && (
          <Link
            style={{ marginLeft: "10px", textAlign: "center" }}
            className="sign"
            to={`/${!Language ? "ar" : "en"}/login`}
          >
            <p className="Arabic" style={{ display: "inline" }}>
              <i className="fa-solid fa-key"></i> {t("Auth")}
            </p>
          </Link>
        )}

        <i
          style={{ fontSize: "30px", marginRight: "10px" }}
          className="fa-solid fa-truck"
        ></i>
      </div>
      <br />
      {value === 0 && (
        <div>
          <h2 style={{ marginLeft: "10px" }}>All Cars : </h2>

          {!IsReload &&
            Items.map((data, index) => (
              <MobileCards items={data} key={index}></MobileCards>
            ))}
        </div>
      )}
      {value === 1 && (
        <div>
          <h2 style={{ marginLeft: "10px" }}>Chats : </h2>
        </div>
      )}
      {value === 2 && (
        <div>
          <h2 style={{ marginLeft: "10px" }}>Categorys : </h2>
        </div>
      )}
      {IsReload && <MobileCardSkeleton></MobileCardSkeleton>}
      {IsReload && <MobileCardSkeleton></MobileCardSkeleton>}
      {IsReload && <MobileCardSkeleton></MobileCardSkeleton>}
      {IsReload && <MobileCardSkeleton></MobileCardSkeleton>}
      {IsReload && <MobileCardSkeleton></MobileCardSkeleton>}
      {IsReload && <MobileCardSkeleton></MobileCardSkeleton>}
      {IsReload && <MobileCardSkeleton></MobileCardSkeleton>}
      {/* <Box sx={{ width: " 100%", position: "fixed", bottom: "0px" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            label={t("home")}
            icon={
              <i
                style={{ fontSize: "1.5rem" }}
                className="fa-solid fa-house"
              ></i>
            }
          />
          <BottomNavigationAction
            label={t("chat")}
            icon={
              <i
                style={{ fontSize: "1.5rem" }}
                className="fa-solid fa-comment"
              ></i>
            }
          />
          <BottomNavigationAction
            label={t("categories")}
            icon={
              <i
                style={{ fontSize: "1.5rem" }}
                className="fa-solid fa-shapes"
              ></i>
            }
          />
          {!isLoggedIn && (
            <BottomNavigationAction
              label={t("Auth")}
              onClick={() => {
                window.location = `/${!Language ? "ar" : "en"}/login`
              }}
              icon={
                <i
                  style={{ fontSize: "1.5rem" }}
                  className="fa-solid fa-key"
                ></i>
              }
            />
          )}
        </BottomNavigation>
      </Box> */}
    </div>
  )
}

export default MobileExplore

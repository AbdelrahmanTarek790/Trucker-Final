import * as React from "react"
import AuthContext from "../store/auth-context"
import { useState } from "react"
import { useContext } from "react"
import ConstContext from "../store/const-context"
import { useEffect } from "react"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import logo from "../Images/Logo.png"

import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material"
const MobileHeader = () => {
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const isLoggedIn = authCtx.isLoggedIn
  const [DrawerOpen, setDrawerOpen] = useState(false)
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

  const [Language, setLang] = useState(authCtx.lang)
  const IsID = authCtx.id
  if (isLoggedIn) {
    if (IsID === null) {
      window.location.reload(true)
    }
  }
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
  }, [])
  return (
    <div
      style={{
        display: "flex",
        boxShadow: "black 0px -2px 10px",
        height: "80px",
        backgroundColor: "rgb(255, 188, 0)",
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
                <i className="fa-solid fa-truck"></i> {t("cart")}
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
      {/* <input
      type="search"
      name="search"
      autoComplete="off"
      style={{
        textAlign: "right",
        borderRadius: "5px",
        height: "50%",
      }}
      placeholder="ما الذي تبحث عنه؟"
    ></input> */}
      <img style={{ marginRight: "10px" }} width="120px" src={logo} alt="" />
      <React.Fragment>
        <Button
          onClick={() => {
            setDrawerOpen(true)
          }}
        >
          <i
            style={{ fontSize: "30px", color: "black", marginRight: "10px" }}
            className="fa-solid fa-bars"
          ></i>
        </Button>
        <SwipeableDrawer
          anchor="right"
          open={DrawerOpen}
          onClose={() => {
            setDrawerOpen(false)
          }}
          onOpen={() => {
            setDrawerOpen(true)
          }}
        >
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
            onClick={() => {
              setDrawerOpen(false)
            }}
            onKeyDown={() => {
              setDrawerOpen(false)
            }}
          >
            <List>
              <ListItem
                onClick={() => {
                  window.location = `/${!Language ? "ar" : "en"}/`
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <i className="fa-solid fa-house"></i>
                  </ListItemIcon>
                  <ListItemText primary={t("home")} />
                </ListItemButton>
              </ListItem>
              <ListItem
                onClick={() => {
                  window.location = `/${!Language ? "ar" : "en"}/explore/`
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </ListItemIcon>
                  <ListItemText primary={t("Explore")} />
                </ListItemButton>
              </ListItem>
              <ListItem
                onClick={() => {
                  window.location = `/${!Language ? "ar" : "en"}/contact/`
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <i className="fa-solid fa-address-book"></i>
                  </ListItemIcon>
                  <ListItemText primary={t("Contact")} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <i className="fa-regular fa-address-card"></i>
                  </ListItemIcon>
                  <ListItemText primary={t("About")} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}

export default MobileHeader

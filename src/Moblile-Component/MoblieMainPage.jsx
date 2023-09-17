import * as React from "react"
import AuthContext from "../store/auth-context"
import { useState } from "react"
import { useContext } from "react"
import ConstContext from "../store/const-context"
import { useEffect } from "react"
import axios from "axios"
import MobileCards from "./MobileCards"
import { useTranslation } from "react-i18next"

import MobileHeader from "./MobileHeader"
import MobileCardSkeleton from "./MobileCardSkeleton"
const MoblieMainPage = () => {
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const isLoggedIn = authCtx.isLoggedIn
  const [IsReload, SetIsReload] = useState(true)

  const { t } = useTranslation()

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

  useEffect(() => {
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
        setItems(res.data.trucks)
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
      <MobileHeader></MobileHeader> <br />
      <div>
        <h2 style={{ marginLeft: "10px" }}>All Cars : </h2>

        {!IsReload &&
          Items.map((data, index) => (
            <MobileCards items={data} key={index}></MobileCards>
          ))}
      </div>
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

export default MoblieMainPage

import React from "react"
import AuthContext from "../store/auth-context"
import { useContext, useEffect, useState } from "react"

import "./css/Contact.css"
import "./css/profile.css"
import Header from "../Component/Header"
import Footer from "../Component/Footer"
import AccountInfo from "../Component/Account-info"
import { useTranslation } from "react-i18next"
import OfferProfile from "../Component/Your-Post"
const Profile = () => {
  const { t } = useTranslation()
  const authCtx = useContext(AuthContext)
  const [isOPen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOPen)
  const [Info, SetInfo] = useState("Account Information")

  const menuItem = [
    {
      name: "Account Information",
      tran: t("Information"),
      icon: <i className="fa-solid fa-user"></i>,
    },
    {
      name: "Your Offers",
      tran: t("Offers"),
      icon: <i className="fa-solid fa-signs-post"></i>,
    },
    {
      name: "Order History",
      tran: t("History"),
      icon: <i className="fa-solid fa-cart-arrow-down"></i>,
    },
    {
      name: "Payment Method",
      tran: t("Payment"),
      icon: <i className="fa-solid fa-credit-card"></i>,
    },
  ]

  return (
    <div>
      <Header></Header>
      <center style={{ marginBottom: "50px" }}>
        <div className="ProfCont">
          <div style={{ width: isOPen ? "350px" : "50px" }} className="sidebar">
            <div className="top_section">
              <h1
                style={{ display: isOPen ? "block" : "none" }}
                className="Proflogo"
              >
                <i className="fa-solid fa-user"></i>
              </h1>
              <div
                style={{ marginLeft: isOPen ? "200px" : "0px" }}
                className="bars"
              >
                <i className="fa-solid fa-bars" onClick={toggle}></i>
              </div>
            </div>
            {menuItem.map((item, index, tran) => (
              <a
                onClick={() => {
                  SetInfo(item.name)
                }}
                style={{
                  backgroundColor:
                    Info === item.name ? "rgb(188, 188, 188)" : "",
                  cursor: "pointer",
                  color: Info === item.name ? "black" : "",
                }}
                key={index}
                className="link"
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOPen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.tran}
                </div>
              </a>
            ))}
          </div>
          <main>
            {Info === "Account Information" && <AccountInfo></AccountInfo>}
            {Info === "Your Offers" && <OfferProfile></OfferProfile>}
            {Info === "Order History" && (
              <div>
                <h1>History</h1>
              </div>
            )}
            {Info === "Payment Method" && (
              <div>
                <h1>{t("Payment")}</h1>
              </div>
            )}
          </main>
        </div>
      </center>
      <Footer></Footer>
    </div>
  )
}

export default Profile

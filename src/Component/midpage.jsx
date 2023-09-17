import React from "react"
import topic from "../Images/24585.png"

import "../App.css"
import "./css/LowP.css"
import "./css/main.css"
import { useTranslation } from "react-i18next"
function MainP() {
  const { t } = useTranslation()
  return (
    <div style={{ backgroundColor: "#f1f1f1" }} className="Lowpage">
      <div style={{ position: "relative" }}>
        <img src={topic} style={{ width: "100%" }} alt=""></img>

        <div className="homepagetext">
          <div className="mt-6 ">
            <h1
              className="Textparphs"
              style={{ color: "white", textAlign: "center" }}
            >
              {t("t1")}
            </h1>
            <h1
              className="Textparphs"
              style={{ color: "white", textAlign: "center" }}
            >
              {t("t2")}
            </h1>
            <h1
              className="Textparphs"
              style={{ color: "white", textAlign: "center" }}
            >
              {t("t3")}
            </h1>
          </div>
          <button className="moreformore">{t("more")}</button>
        </div>
      </div>
    </div>
  )
}

export default MainP

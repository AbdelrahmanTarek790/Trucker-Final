import * as React from "react"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../store/auth-context"
import logo from "../Images/Logo.png"
import pic from "../Images/flat-design-transport-truck-delivery_23-2149146360.png"
import Particles from "../Component/particles"
import { useTranslation } from "react-i18next"
import ConstContext from "../store/const-context"
import Customer from "../Component/Customer"
import ServiceProvider from "../Component/ServiceProvider"
export default function SignUp() {
  const [Selected, setSelected] = useState("customer")

  const { t } = useTranslation()

  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)

  const hand = () => {
    setLang(Authcont.langHandlers())
    console.log(Language)
    setTimeout(() => {
      window.location = Language ? "/ar/register" : "/en/register"
    }, 500)
  }

  return (
    <div>
      <Particles></Particles>
      <div className="limiter">
        <div className="container-login100">
          <div className="flexcontainer" style={{ display: "flex" }}>
            <div
              style={{
                position: "relative",

                backgroundColor: "#ffbc00",
              }}
              className="wrap-login200"
            >
              <i
                onClick={hand}
                style={{
                  position: "absolute",
                  left: "5%",
                  color: "black",
                  top: "1.9%",
                  fontSize: "40px",
                }}
                className="fa-solid fa-language"
              ></i>
              <center>
                <img style={{ marginTop: "250px" }} src={logo} alt="Logo" />
                <img style={{ width: "70%" }} src={pic} alt="" />
                <h3>{t("t1")}</h3>
                <h3>{t("t2")}</h3>
                <h3>{t("t3")}</h3>
              </center>
            </div>

            <div
              style={{
                position: "relative",
                height: "850px",
                overflow: "scroll",
                overflowX: "hidden",
              }}
              className="wrap-login100"
            >
              <div
                onSubmit={(e) => {
                  e.preventDefault()
                }}
                style={
                  !Language ? { textAlign: "right" } : { textAlign: "left" }
                }
                className="login100-form validate-form"
              >
                <span className="login100-form-title p-b-26">
                  {t("Welcome")}
                </span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      setSelected("customer")
                    }}
                    style={{
                      padding: "10px",
                      color: "black",
                      borderBottom:
                        Selected === "customer"
                          ? "2px solid rgb(255, 188, 0)"
                          : "",
                      backgroundColor: "transparent",
                      borderRadius: "0px",
                    }}
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => {
                      setSelected("service_provider")
                    }}
                    style={{
                      padding: "10px",
                      color: "black",
                      borderBottom:
                        Selected === "service_provider"
                          ? "2px solid rgb(255, 188, 0)"
                          : "",
                      backgroundColor: "transparent",
                      borderRadius: "0px",
                    }}
                  >
                    Service Provider
                  </button>
                </div>

                {Selected === "customer" && <Customer></Customer>}
                {Selected === "service_provider" && (
                  <ServiceProvider></ServiceProvider>
                )}
                <div className="text-center p-t-50">
                  <span className="txt2">{t("yaacc")}</span>

                  <Link
                    style={{ fontWeight: "bold" }}
                    className="txt2"
                    to={`/${!Language ? "ar" : "en"}/login`}
                  >
                    {t("Auth2")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

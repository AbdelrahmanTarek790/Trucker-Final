import { Link, useHistory, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import ConstContext from "../store/const-context"
import axios from "axios"
import "./Mobile.css"
import AuthContext from "../store/auth-context"
import { Avatar, Skeleton } from "@mui/material"
import { useTranslation } from "react-i18next"

const Mobiledetails = () => {
  const history = useHistory()
  const [IsReload, SetIsReload] = useState(true)
  const Constant = useContext(ConstContext)
  const authCtx = useContext(AuthContext)
  const { t } = useTranslation()
  const [Language, setLang] = useState(authCtx.lang)
  const [ShowReadmore, SetShowReadmore] = useState(false)
  const [ReadMore, SetReadMore] = useState(false)
  const Url = Constant.url
  let { itemId } = useParams()
  const ShowmoreHandler = () => {
    SetReadMore(!ReadMore)
  }

  const BackHandler = () => {
    window.history.go(-1)
  }

  const [item, setitem] = useState({
    category: "",
    description: "",
    government: "",
    photo: "",
    price: "",
    title: "",
    userId: "",
  })

  const [user, setUser] = useState({
    name: "",
    email: "",
    _id: "",
    avatar: "",
  })

  useEffect(() => {
    axios
      .get(`${Constant[0].url}/api/v1/truck/${itemId}`, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data)
        setitem(res.data)

        if (res.data.description.length >= 130) {
          SetShowReadmore(true)
        } else {
          SetReadMore(true)
        }
        SetIsReload(false)
        axios
          .get(`${Constant[0].url}/api/v1/users/${res.data.userId}`, {
            headers: {
              accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data.user)
            setUser(res.data.user)
            SetIsReload(false)
            // console.clear()
          })
        // console.clear()
      })
      .catch((error) => {
        // history.replace("/error-404")
        console.log(error)
      })
  }, [itemId])

  return (
    <div style={{ backgroundColor: "white", height: "900px" }}>
      <div
        style={{
          height: "460px",
          borderRadius: "0px 0px 20px 20px",
          backgroundColor: "#f7f7f7",
        }}
      >
        <center>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
              paddingTop: "15px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                justifyContent: "center",
                borderRadius: "15px",
              }}
              onClick={BackHandler}
            >
              <i
                style={{ fontSize: "20px" }}
                className="fa-solid fa-chevron-left"
              ></i>
            </div>
            <div
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                justifyContent: "center",
                borderRadius: "15px",
              }}
              onClick={BackHandler}
            >
              <i
                style={{ fontSize: "20px" }}
                className="fa-regular fa-share-from-square"
              ></i>
            </div>
          </div>
        </center>

        <br />
        <div style={{ marginBottom: "30px", marginLeft: "25px" }}>
          {IsReload && <Skeleton style={{ fontSize: "35px", width: "93%" }} />}
          {!IsReload && (
            <h2 style={{ fontSize: "35px", width: "93%" }}>{item.title}</h2>
          )}
          {!IsReload && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <i style={{ color: "#ffbc00" }} className="fa-solid fa-star"></i>
              <p style={{ marginLeft: "2px", margin: "0px" }}>4.9</p>
              <p
                style={{
                  margin: "0px",
                  marginLeft: "10px",
                  color: "rgb(116 111 111)",
                }}
              >
                (110 Reviews)
              </p>
            </div>
          )}
          {IsReload && <Skeleton style={{ width: "50%" }} />}
        </div>
        <center>
          {!IsReload && (
            <img
              style={{ width: "89%", height: "253px", borderRadius: "10px" }}
              src={item.imageCover}
              alt=""
            />
          )}
          {IsReload && (
            <Skeleton
              variant="rectangular"
              style={{ width: "89%", height: "253px", borderRadius: "10px" }}
            />
          )}
        </center>
      </div>
      <center>
        <div
          style={{
            textAlign: "left",
            width: "90%",
            paddingTop: "15px",
          }}
        >
          <h3 style={{ color: "rgb(92, 90, 100)" }}>{t("Overview")} : </h3>

          {!IsReload && (
            <p
              className={!ReadMore ? "ShowMoreText" : ""}
              style={{ color: "rgb(62 62 62)" }}
            >
              {item.description}
            </p>
          )}
          {!IsReload && ShowReadmore && (
            <p
              onClick={ShowmoreHandler}
              style={{
                cursor: "pointer",
                width: "100%",
                marginTop: "-10px",
                color: "rgb(62 62 62)",
                textAlign: "right",
              }}
            >
              <a> {ReadMore ? t("Showless") : t("Showmore")}</a>
            </p>
          )}
          {IsReload && <Skeleton style={{ width: "93%" }} />}
          {IsReload && <Skeleton style={{ width: "93%" }} />}
          {IsReload && (
            <Skeleton style={{ width: "93%", marginBottom: "15px" }} />
          )}
        </div>
      </center>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          backgroundColor: "white",
          justifyContent: "space-evenly",
        }}
      >
        {/* /////////////////////////////////////////// */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f7f7f7",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            <i style={{ fontSize: "20px" }} className="fa-solid fa-truck"></i>
          </div>
          <p>{item.category}</p>
        </div>
        {/* /////////////////////////////////////////// */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f7f7f7",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            <p style={{ margin: "0px", fontWeight: "bold", fontSize: "20px" }}>
              EGP
            </p>
          </div>
          <p>{item.price}</p>
        </div>
        {/* /////////////////////////////////////////// */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f7f7f7",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            <i style={{ fontSize: "20px" }} className="fa-solid fa-star"></i>
          </div>
          <p>4.9</p>
        </div>
        {/* /////////////////////////////////////////// */}
        <div
          style={{
            display: "flex",
            width: "20%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f7f7f7",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            <i
              style={{ fontSize: "20px" }}
              className="fa-solid fa-location-dot"
            ></i>
          </div>
          <p>{item.government}</p>
        </div>
      </div>
      <center style={{ backgroundColor: "white" }}>
        <div
          style={{
            textAlign: "left",
            width: "90%",

            marginBottom: "20px",
            paddingTop: "15px",
          }}
        >
          <h2>Renter</h2>
          {IsReload && <Skeleton style={{ fontSize: "35px", width: "93%" }} />}
          {!IsReload && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  style={{ width: "40px", height: "40px" }}
                  alt={user.name}
                  src={user.avatar === null ? "/broken-image.jpg" : user.avatar}
                />
                <p style={{ margin: "0px", marginLeft: "5px" }}>{user.name}</p>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f7f7f7",
                  justifyContent: "center",
                  borderRadius: "15px",
                }}
              >
                <i
                  style={{ fontSize: "15px" }}
                  className="fa-solid fa-comment-dots"
                ></i>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            columnGap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              color: "white",
              width: "80%",
              height: "45px",

              marginBottom: "15px",
            }}
          >
            Add to Cart
          </button>
          <div
            className="Favorite"
            style={{
              width: "45px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f7f7f7",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            <i
              style={{ fontSize: "20px", color: "red" }}
              className="fa-regular fa-heart"
            ></i>
          </div>
        </div>
      </center>
    </div>
  )
}

export default Mobiledetails

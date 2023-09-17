import { Link, useHistory, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Header from "../Component/Header"
import ConstContext from "../store/const-context"
import axios from "axios"
import "./css/details.css"
import { AiFillClockCircle, AiFillCalendar } from "react-icons/ai"
import { TbManualGearbox, TbEngine } from "react-icons/tb"
import { FaTruck } from "react-icons/fa"
import { MdFactory } from "react-icons/md"
import Footer from "../Component/Footer"
import { Breadcrumbs, Skeleton, Typography } from "@mui/material"
import AuthContext from "../store/auth-context"

const Detailsitems = () => {
  const history = useHistory()
  const [IsReload, SetIsReload] = useState(true)
  const [IsSelected, SetIsSelected] = useState(false)
  const Constant = useContext(ConstContext)
  const authCtx = useContext(AuthContext)
  const [Language, setLang] = useState(authCtx.lang)
  const Url = Constant.url
  let { itemId } = useParams()

  // const togglePopup = () => {
  //   SetIsSelected(!IsSelected)
  // }

  const [date, setDate] = useState()

  const [item, setitem] = useState({
    category: "",
    description: "",
    government: "",
    photo: "",
    price: "",
    title: "",
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
        console.log(res)

        const d = new Date(res.data.createdAt)
        setDate(`${d.getFullYear()} / ${d.getMonth() + 1} / ${d.getDay()} `)
        setitem(res.data)
        SetIsReload(false)
        // console.clear()
      })
      .catch((error) => {
        console.log(error)
      })
  }, [itemId])

  return (
    <div>
      <Header></Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "150px",
        }}
      >
        {!IsReload && (
          <Breadcrumbs
            style={{ position: "absolute", top: "250px", width: "1066px" }}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              style={{ color: "black" }}
              to={`/${!Language ? "ar" : "en"}`}
            >
              <i className="fa-solid fa-house"></i> Home
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              style={{ color: "black" }}
              to={`/${!Language ? "ar" : "en"}/category/${item.category}`}
            >
              <i className="fa-solid fa-filter"></i>
              {Constant[1][item.category]}
            </Link>
          </Breadcrumbs>
        )}

        {IsReload && (
          <div style={{ position: "absolute", top: "246px", width: "1066px" }}>
            <Skeleton width={250} height={35} />
          </div>
        )}
      </div>
      <div
        className="pas"
        style={{
          width: "100%",
          display: "flex",
          marginTop: "150px",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "654px", marginRight: "50px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 className="n" style={{ marginRight: "50px" }}>
                {item.name}
                {IsReload && <Skeleton style={{ paddingRight: "350px" }} />}
              </h2>

              <h2 className="p">
                {!IsReload && `$ ${item.price}`}
                {IsReload && <Skeleton style={{ paddingRight: "200px" }} />}
              </h2>
            </div>

            <hr />
          </div>

          {!IsReload && (
            <img
              style={{ marginRight: "30px", marginTop: "7px" }}
              width={640}
              height={420}
              src={item.imageCover}
            ></img>
          )}
          {IsReload && (
            <Skeleton variant="rectangular" width={640} height={420}>
              <div
                style={{
                  marginRight: "30px",
                  marginTop: "24px",
                  paddingTop: "57%",
                }}
              />
            </Skeleton>
          )}
        </div>

        <div className="col-lg-4">
          <div style={{ width: "362px" }} className="product_list_right">
            <p
              className="main_btn red popup-with-zoom-anim"
              style={{
                backgroundColor: "black",
                border: "0",
                cursor: "pointer",
              }}
              href="#offerPopup"
            >
              Booking
            </p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <ul className="ulDetails nav flex-column">
              <li style={{ listStyle: "none" }}>
                {!IsReload && (
                  <a className="ColumnDetails">
                    <i>
                      <AiFillClockCircle />
                    </i>
                    Date
                    <span className="d">{date}</span>
                  </a>
                )}

                {IsReload && (
                  <a className="ColumnDetails">
                    <Skeleton />
                  </a>
                )}
              </li>
              <li style={{ listStyle: "none" }}>
                {!IsReload && (
                  <a className="ColumnDetails">
                    <i>
                      <TbManualGearbox />
                    </i>
                    Transmission <span className="mo">Automatic</span>
                  </a>
                )}
                {IsReload && (
                  <a className="ColumnDetails">
                    <Skeleton />
                  </a>
                )}
              </li>
              <li style={{ listStyle: "none" }}>
                {!IsReload && (
                  <a className="ColumnDetails">
                    <i>
                      <AiFillCalendar />
                    </i>
                    Year <span className="y">2019</span>
                  </a>
                )}
                {IsReload && (
                  <a className="ColumnDetails">
                    <Skeleton />
                  </a>
                )}
              </li>
              <li style={{ listStyle: "none" }}>
                {!IsReload && (
                  <a className="ColumnDetails">
                    <i>
                      <TbEngine />
                    </i>
                    Engine Size <span className="e">3500 cc</span>
                  </a>
                )}
                {IsReload && (
                  <a className="ColumnDetails">
                    <Skeleton />
                  </a>
                )}
              </li>
              <li style={{ listStyle: "none" }}>
                {!IsReload && (
                  <a className="ColumnDetails">
                    <i>
                      <FaTruck />
                    </i>
                    Body Type <span className="s">Sedan</span>
                  </a>
                )}
                {IsReload && (
                  <a className="ColumnDetails">
                    <Skeleton />
                  </a>
                )}
              </li>
              <li style={{ listStyle: "none" }}>
                {!IsReload && (
                  <a className="ColumnDetails0">
                    <i>
                      <TbEngine />
                    </i>
                    Engine Type <span className="e">Petrol</span>
                  </a>
                )}
                {IsReload && (
                  <a className="ColumnDetails0">
                    <Skeleton />
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "150px",
        }}
      >
        <div style={{ width: "1066px" }} className="product_overview_text">
          <h4>Description : </h4>
          {IsReload && (
            <div>
              <Skeleton variant="text" width="100%" sx={{ fontSize: "22px" }} />
              <Skeleton variant="text" width="100%" sx={{ fontSize: "22px" }} />
              <Skeleton variant="text" width="100%" sx={{ fontSize: "22px" }} />
              <Skeleton variant="text" width="100%" sx={{ fontSize: "22px" }} />
              <Skeleton variant="text" width="70%" sx={{ fontSize: "22px" }} />
            </div>
          )}
          <p style={{ fontSize: "22px" }}>{item.description}</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Detailsitems

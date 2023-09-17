import React from "react"
import Header from "../Component/Header"
import Fab from "@mui/material/Fab"
import { useState, useEffect, useContext } from "react"
import Popup from "../Component/Popup"
import ProdCard from "../Component/ProductCard"
import CircularProgress from "@mui/material/CircularProgress"
import AuthContext from "../store/auth-context"
import ConstContext from "../store/const-context"
import { Link } from "react-router-dom"
import Footer from "../Component/Footer"
import axios from "axios"
import SkeletonCard from "../Component/SkeletonCard"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import Filter from "../Component/Filter"

const Explore = () => {
  const SkeletonNumber = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]
  // /////////////////////////////////////////////////////////
  const Constant = useContext(ConstContext)
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const [isOpen, setIsOpen] = useState(false)
  const [HasData, SetHasData] = useState(false)
  const [Language, setLang] = useState(authCtx.lang)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  const [items, setItems] = useState([
    {
      description: "",
      imageCover: "",
      price: "",
      rating: "",
      title: "",
      type: "",
    },
  ])

  const [IsReload, SetIsRaload] = useState(true)

  useEffect(() => {
    document.title = "Explore"
    axios
      .get(`${Constant[0].url}/api/v1/truck`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: JSON.stringify(),
      })
      .then((res) => {
        console.log(res)
        setItems(res.data.trucks.reverse())
        SetHasData(true)
        SetIsRaload(false)
      })
      .catch((error) => {
        console.log(error)
        SetIsRaload(false)
        SetHasData(false)
      })
  }, [])

  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <Header></Header>
      <div style={{ minHeight: "900px" }}>
        <Filter></Filter>
        <div
          className="wrapper"
          style={{
            paddingTop: "20px",
          }}
        >
          {IsReload &&
            SkeletonNumber.map((item, index) => (
              <SkeletonCard key={index}></SkeletonCard>
            ))}

          {!IsReload &&
            HasData &&
            items.map((data, index) => (
              <ProdCard items={data} key={index}></ProdCard>
            ))}
        </div>
        <div>
          {!IsReload && !HasData && (
            <center>
              <h3>There is no posts yet!</h3>
            </center>
          )}
          {isOpen && <Popup handleClose={togglePopup} />}
          {isLoggedIn && authCtx.role === "service_provider" && (
            <Fab
              style={{
                position: "fixed",
                bottom: "0",
                right: "0",
                marginBottom: "50px",
                marginRight: "50px",
                backgroundColor: "black",
              }}
              color="primary"
              onClick={togglePopup}
            >
              <i style={{ fontSize: "25px" }} className="fa-solid fa-plus"></i>
            </Fab>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Explore

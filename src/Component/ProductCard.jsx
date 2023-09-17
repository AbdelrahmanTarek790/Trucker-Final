import "./css/LowP.css"
import Button from "@mui/material/Button"
import { Link, useHistory } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../store/auth-context"
import ConstContext from "../store/const-context"
const ProdCard = (props) => {
  const Authcont = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const category = props.items.category
  const [Language, setLang] = useState(Authcont.lang)
  const d = new Date(props.items.createdAt)
  const [date, setDate] = useState(
    `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDay()} `
  )

  return (
    <div
      style={{ backgroundColor: "white", cursor: "pointer" }}
      className="ProdCard"
    >
      <Link
        style={{ cursor: "pointer" }}
        to={`/${!Language ? "ar" : "en"}/details/${props.items.id}`}
      >
        <img className="ProdIMG" src={props.items.imageCover} alt=""></img>
        <div style={{ padding: " 12px 14px 18px" }}>
          <h4
            style={{
              height: "36px",
              fontSize: "24px",
              overflow: "hidden",
              font: "bold 24px Cairo",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "20px",
            }}
          >
    
            {props.items.name}
          </h4>
          <h5 style={{ float: "right", color: "black" }}>
            {props.items.price}$
          </h5>
          <p style={{ color: "black" }}>
            Posted at: <span>{`${date}`}</span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            borderTop: " 1px solid #e4e4e4",
            cursor: "pointer",
          }}
        >
          <p style={{ color: "black" }} className="iconcard">
            <i className="icon-engine"></i> 2500
          </p>
          <p style={{ color: "black" }} className="iconcard">
            <i className="icon-gear1"></i> {props.items.locationFrom}
          </p>
          <p style={{ color: "black" }} className="iconcard1">
            <i className="icon-oil"></i>
            {Constant[1][category]}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default ProdCard

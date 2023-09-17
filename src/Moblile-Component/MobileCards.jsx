import { useState } from "react"
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../store/auth-context"

const MobileCards = (props) => {
  const history = useHistory()

  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)
  const ClickPostHandler = () => {
    window.location = `/${!Language ? "ar" : "en"}/details/${props.items.id}`
  }
  return (
    <center>
      <div
        style={{
          display: "flex ",
          width: "95%",
          height: "150px",
          backgroundColor: "white",
          alignItems: "center",
          marginBottom: "10px",
          borderRadius: "15px",
        }}
        onClick={ClickPostHandler}
      >
        <img
          style={{
            borderRadius: "15px",
            marginLeft: "10px",
            marginRight: "15px",
          }}
          height={140}
          width={180}
          src={props.items.imageCover}
        ></img>
        <div
          style={{
            display: "flex",
            width: "100%",
            overflow: "hidden",
            height: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <br />
          <h4>{props.items.title}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "97%",
            }}
          >
            <p>Category : {props.items.category}</p>
            <p>Price : ${props.items.price}</p>
          </div>
        </div>
      </div>
    </center>
  )
}

export default MobileCards

import { useEffect } from "react"
import AuthContext from "../store/auth-context"
import ConstContext from "../store/const-context"
import { useState } from "react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
const MobileProfile = () => {
  const { t } = useTranslation()
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const [disable, setDisable] = useState(true)
  const Fname = useRef()
  const Lname = useRef()
  const Password = useRef()
  const ConfPassword = useRef()
  const oldPassword = useRef()
  const PhoneNumber = useRef()
  const State = useRef()
  const [IsReload, SetIsRaload] = useState(false)
  const [selects, setSelects] = useState()
  const [user, setUser] = useState([
    {
      name: "",
      fname: "",
      lname: "",
      email: "",
      avatar: "",
      phone: "",
    },
  ])

  useEffect(() => {
    fetch(
      `https://cute-cyan-coyote-fez.cyclic.app/api/v1/users/${authCtx.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        SetIsRaload(true)
        setUser(data.user)
        setUser({
          name: data.user.name,
          fname: data.user.name.split(" ")[0],
          lname: data.user.name.split(" ")[1],
          email: data.user.email,
          phone: data.user.phone,
          avatar: data.user.avatar,
        })
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error)
      })
  }, [authCtx.id])
  return (
    <div style={{ backgroundColor: "rgb(241, 241, 241)" }}>
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={user.avatar}
          width={150}
          height={150}
          style={{ borderRadius: "500px" }}
        ></img>
      </div>
    </div>
  )
}

export default MobileProfile

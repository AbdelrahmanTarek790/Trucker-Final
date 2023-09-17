import ProfileCards from "./profileCards"
import AuthContext from "../store/auth-context"
import ConstContext from "../store/const-context"
import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { CircularProgress } from "@mui/material"
import { useTranslation } from "react-i18next"
import PopupConfDel from "./PopupConfDel"
const OfferProfile = () => {
  const authCtx = useContext(AuthContext)
  const Constatnt = useContext(ConstContext)
  const { t } = useTranslation()
  const [IsReload, SetIsReload] = useState(true)
  const [HasData, SetHasData] = useState(false)
  const [user, setUser] = useState([
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

  useEffect(() => {
    axios
      .get(`${Constatnt.url}/api/v1/truck?userId=${authCtx.id}`)
      .then((res) => {
        console.log(res)
        setUser(res.data.equipment)
        SetHasData(true)
        SetIsReload(false)
      })
      .catch((error) => {
        SetIsReload(false)
        SetHasData(false)
      })
  }, [])
  return (
    <div>
      <div>
        <h1>{t("Offers")}</h1>
      </div>
      <hr style={{ marginBottom: "50px" }}></hr>
      {IsReload && (
        <CircularProgress style={{ marginTop: "23%", color: "#ffbc00" }} />
      )}
      {!IsReload &&
        HasData &&
        user.map((data, index) => (
          <ProfileCards items={data} key={index}></ProfileCards>
        ))}
      {!IsReload && !HasData && <h3>{t("onItems")}</h3>}
    </div>
  )
}

export default OfferProfile

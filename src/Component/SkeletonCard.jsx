import "./css/LowP.css"
import Button from "@mui/material/Button"
import { useHistory } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../store/auth-context"
import { Skeleton } from "@mui/material"
const SkeletonCard = () => {
  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)
  const history = useHistory()
  return (
    <div style={{ backgroundColor: "white" }} className="SkeleCard">
      <Skeleton variant="rectangular" width={350} height={185} />

      <div style={{ padding: " 12px 14px 18px" }}>
        <Skeleton height={50} />
        <Skeleton />
        <Skeleton width="70%" />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton width={250} height={50} />
      </div>
    </div>
  )
}

export default SkeletonCard

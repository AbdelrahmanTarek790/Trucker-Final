import "./css/Popup.css"
import { useState, useContext } from "react"
import Button from "@mui/material/Button"
import AuthContext from "../store/auth-context"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "react-toastify"
import { Cancel, Delete } from "@mui/icons-material"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import ConstContext from "../store/const-context"

import { CircularProgress } from "@mui/material"

const PopupConfDel = (props) => {
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const [IsReload, SetIsReload] = useState(false)
  const { t } = useTranslation()
  console.log(props.items)
  const DeleteHandler = () => {
    SetIsReload(true)
    axios
      .delete(`${Constant[0].url}/api/v1/Equipments/${props.items}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        console.log(res)

        toast.success("The Item has been removed")
        SetIsReload(false)
        setTimeout(() => {
          window.location.reload(true)
        }, 2000)
      })
      .catch((error) => {
        console.log(error)
        toast.error(
          "You need to logout and login again to change the account info"
        )
      })
  }

  return (
    <div>
      <div className="popup-box">
        <div style={{ width: "400px", marginTop: "20%" }} className="box">
          <div
            style={{ display: "flex", color: "black" }}
            className="modal-header"
          >
            <h2 style={{ marginBottom: "0px" }}>{t("ConfDel")}</h2>
            <button
              style={{ marginBottom: "0px" }}
              onClick={props.handleClose}
              className="btn--close"
              type="button"
              data-testid="close-modal"
            >
              <svg style={{ width: "25px" }} viewBox="0 0 24 24" className="">
                <path d="M17 7L7 17" stroke="#ffbc00" strokeWidth="2"></path>
                <path d="M7 7L17 17" stroke="#ffbc00" strokeWidth="2"></path>
              </svg>
            </button>
          </div>
          {!IsReload && (
            <div
              className="mt-5"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button
                variant="contained"
                startIcon={<Cancel />}
                onClick={props.handleClose}
              >
                {t("cancel")}
              </Button>
              <Button
                variant="contained"
                startIcon={<Delete />}
                style={{ backgroundColor: "red", color: "white" }}
                //   style={{ borderColor: "red", color: "red" }}
                onClick={DeleteHandler}
              >
                {t("Delete")}
              </Button>
            </div>
          )}
          {IsReload && (
            <div style={{ marginTop: "20px" }}>
              <center>
                <CircularProgress />
              </center>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PopupConfDel

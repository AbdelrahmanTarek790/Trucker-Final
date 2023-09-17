import { Button } from "@mui/material"
import { Cancel, Delete, Edit } from "@mui/icons-material"
import axios from "axios"
import AuthContext from "../store/auth-context"
import ConstContext from "../store/const-context"
import { useContext, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import PopupConfDel from "./PopupConfDel"
import PopupEdit from "./PopupEdit"

const ProfileCards = (props) => {
  const { t } = useTranslation()
  const Delid = props.items._id
  const Constant = useContext(ConstContext)
  const authCtx = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setisOpenEdit] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  const togglePopupEdit = () => {
    setisOpenEdit(!isOpenEdit)
  }

  return (
    <div
      style={{
        width: "90%",
        marginTop: "15px",
        backgroundColor: "rgb(239 239 239)",
        height: "250px",
        borderRadius: "20px",
        display: "flex",
      }}
    >
      <ToastContainer
        style={{ marginTop: "50px" }}
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        pauseOnHover
      />
      <img
        width="30%"
        height="100%"
        style={{ borderRadius: "19px" }}
        src={props.items.photo}
      ></img>
      <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "70%",
            overflow: "hidden",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ marginLeft: "30px", marginTop: "25px" }}>
              {t("title")} : {props.items.title}
            </h3>
            <h3 style={{ marginRight: "30px", marginTop: "25px" }}>
              {t("price")} : {props.items.price}
            </h3>
          </div>
          <div
            style={{
              height: "55%",
              textAlign: "left",
              marginLeft: "29px",
              overflow: "hidden",
            }}
          >
            <p style={{ marginBlockEnd: "0" }}>
              {t("Description")} : {props.items.description}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "60%",
              marginTop: "10px",
              marginLeft: "29px",
            }}
          >
            <p style={{ marginRight: "10px", textAlign: "left" }}>
              {t("government")} : {props.items.government}
            </p>
            <p style={{ textAlign: "right" }}>
              {t("categories")} : {props.items.category}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "50px",
              alignItems: "center",
            }}
          >
            {isOpen && <PopupConfDel items={Delid} handleClose={togglePopup} />}
            {isOpenEdit && (
              <PopupEdit items={props.items} handleClose={togglePopupEdit} />
            )}
            <Button
              variant="outlined"
              startIcon={<Delete />}
              // onClick={DeleteHandler}
              onClick={togglePopup}
              style={{
                borderColor: "red",
                color: "red",
                marginTop: "20px",
                marginRight: "10px",
                marginLeft: "10px",
                marginBottom: "20px",
              }}
            >
              {t("Delete")}
            </Button>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={togglePopupEdit}
              style={{
                backgroundColor: "#0d6efd",
                marginTop: "20px",

                marginBottom: "20px",
              }}
            >
              {t("Edit")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCards

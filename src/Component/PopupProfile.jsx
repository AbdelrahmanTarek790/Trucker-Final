import "./css/Popup.css"
import { useState, useContext } from "react"
import Button from "@mui/material/Button"
import AuthContext from "../store/auth-context"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "react-toastify"
import { Cancel } from "@mui/icons-material"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import ConstContext from "../store/const-context"
import CropEasy from "./CropEasy"
import { Avatar } from "@mui/material"

const PopupProfile = (props) => {
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [photoURL, setPhotoURL] = useState(props.items)
  const [openCrop, setOpenCrop] = useState(false)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFile(file)
      setPhotoURL(URL.createObjectURL(file))
      setOpenCrop(true)
    }
  }

  return (
    <div>
      <div className="popup-box">
        <div className="box">
          <div style={{ color: "black" }} className="modal-header">
            <button
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
          {!openCrop && (
            <div>
              <label className="-label" htmlFor="profilePhoto">
                <span className=" spanava glyphicon glyphicon-camera"></span>
                <i
                  style={{
                    fontSize: "50px",
                    marginRight: "5px",
                    marginTop: "40px",
                  }}
                  className=" spanava fa-solid fa-camera"
                ></i>
              </label>
              <label htmlFor="profilePhoto">
                <input
                  accept="image/*"
                  id="profilePhoto"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
                <Avatar
                  className="imgAvatar"
                  id="output"
                  alt={props.items.name}
                  src={
                    props.items === null
                      ? "/broken-image.jpg"
                      : props.items.avatar
                  }
                  sx={{ width: 150, height: 150, fontSize: 50 }}
                />
              </label>
              <div style={{ marginTop: "50px" }}>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  style={{ borderColor: "red", color: "red" }}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          {openCrop && (
            <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PopupProfile

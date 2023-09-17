import "./css/Popup.css"
import { useState, useContext } from "react"
import Button from "@mui/material/Button"
import AuthContext from "../store/auth-context"
import { useTranslation } from "react-i18next"
import { Cancel } from "@mui/icons-material"
import "react-toastify/dist/ReactToastify.css"
import ConstContext from "../store/const-context"
import License from "./License"

const PopupNatid = (props) => {
  const authCtx = useContext(AuthContext)

  const onSaveHandler = (data) => {
    props.NatIdData(data)
  }

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
        <div style={{ height: "620px" }} className="box">
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label
                style={{ position: "relative" }}
                className="-label"
                htmlFor="profilePhoto"
              >
                <span className=" spanava glyphicon glyphicon-camera"></span>
                <i
                  style={{
                    fontSize: "50px",
                    marginRight: "40px",
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
              </label>
              <div
                style={{ position: "absolute", bottom: "15px", right: "15px" }}
              >
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
            <License
              {...{
                photoURL,
                setOpenCrop,
                setPhotoURL,
                setFile,
                onSaveHandler,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PopupNatid

import "./css/Popup.css"
import { useState, useContext } from "react"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import FilledInput from "@mui/material/FilledInput"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import AuthContext from "../store/auth-context"
import { useTranslation } from "react-i18next"
import FormHelperText from "@mui/material/FormHelperText"
import ConstContext from "../store/const-context"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Alert, CircularProgress } from "@mui/material"
import axios from "axios"
import { useParams } from "react-router-dom"

// const currencies = [
//   {
//     value: "الإسكندرية",
//     label: "الإسكندرية",
//   },
//   {
//     value: "الإسماعيلية",
//     label: "الإسماعيلية",
//   },
//   {
//     value: "كفر الشيخ",
//     label: "كفر الشيخ",
//   },
//   {
//     value: "أسوان",
//     label: "أسوان",
//   },
//   {
//     value: "أسيوط",
//     label: "أسيوط",
//   },
//   {
//     value: "الأقصر",
//     label: "الأقصر",
//   },
//   {
//     value: "الوادي الجديد",
//     label: "الوادي الجديد",
//   },
//   {
//     value: "شمال سيناء",
//     label: "شمال سيناء",
//   },
//   {
//     value: "البحيرة",
//     label: "البحيرة",
//   },
//   {
//     value: "بني سويف",
//     label: "بني سويف",
//   },
//   {
//     value: "بورسعيد",
//     label: "بورسعيد",
//   },
//   {
//     value: "البحر الأحمر",
//     label: "البحر الأحمر",
//   },
//   {
//     value: "الجيزة",
//     label: "الجيزة",
//   },
//   {
//     value: "الدقهلية",
//     label: "الدقهلية",
//   },
//   {
//     value: "جنوب سيناء",
//     label: "جنوب سيناء",
//   },
//   {
//     value: "دمياط",
//     label: "دمياط",
//   },
//   {
//     value: "سوهاج",
//     label: "سوهاج",
//   },
//   {
//     value: "السويس",
//     label: "السويس",
//   },
//   {
//     value: "الشرقية",
//     label: "الشرقية",
//   },
//   {
//     value: "الغربية",
//     label: "الغربية",
//   },
//   {
//     value: "الفيوم",
//     label: "الفيوم",
//   },
//   {
//     value: "القاهرة",
//     label: "القاهرة",
//   },
//   {
//     value: "القليوبية",
//     label: "القليوبية",
//   },
//   {
//     value: "قنا",
//     label: "قنا",
//   },
//   {
//     value: "مطروح",
//     label: "مطروح",
//   },
//   {
//     value: "المنوفية",
//     label: "المنوفية",
//   },
//   {
//     value: "المنيا",
//     label: "المنيا",
//   },
// ]

// const category = [
//   {
//     value: "Air Compressors",
//     label: "Air Compressors",
//   },
//   {
//     value: "Cabin",
//     label: "Cabin",
//   },
//   {
//     value: "Cranes",
//     label: "Cranes",
//   },
//   {
//     value: "Dump truck",
//     label: "Dump truck",
//   },
//   {
//     value: "Earth Moving",
//     label: "Earth Moving",
//   },
//   {
//     value: "Material Handling",
//     label: "Material Handling",
//   },
//   {
//     value: "Motors",
//     label: "Motors",
//   },
// ]

const PopupBook = (props) => {
  const { t } = useTranslation()
  const authCtx = useContext(AuthContext)
  const Constatnt = useContext(ConstContext)
  const [Error, setError] = useState(false)
  const [ErrorMsg, setErrorMsg] = useState("")
  let { itemId } = useParams()
  const [IsReload, SetIsReload] = useState(false)
  const [photo, setPhoto] = useState(null)

  const [Price, setPrice] = useState("")
  const OnChangeHandlerPrice = (e) => {
    setError(false)
    setPrice(e.target.value)
  }
  const [Period, setPeriod] = useState("")
  const OnChangeHandlerPeriod = (e) => {
    setPeriod(e.target.value)
  }

  const [Description, setDescription] = useState("")
  const OnChangeHandlerDescription = (e) => {
    setError(false)
    setDescription(e.target.value)
  }

  const [startLocation, setstartLocation] = useState([30.5877, 31.5026])
  const [deliveryLocation, setdeliveryLocation] = useState([30.5877, 31.5026])

  const SubmuitHandler = () => {
    // const formData = new FormData()
    // formData.append("rentalPeriod", Period)
    // formData.append("startLocation", startLocation)
    // formData.append("deliveryLocation", deliveryLocation)
    // formData.append("price", Price)
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1])
    // }
   
    // axios
    //   .post(`${Constatnt[0].url}/book-truck/${itemId}`, formData, {
    //     headers: {
    //       Authorization: `Bearer ${authCtx.token}`,
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   })
    //   .then((data) => {
    //     console.log(data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  return (
    <div>
      <div className="popup-box">
        <div className="box">
          {/* <span className="close-icon" onClick={props.handleClose}>
            X
          </span> */}

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

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              sx={{ m: 1, width: "35%" }}
              label="Price"
              onChange={OnChangeHandlerPrice}
              id="standard-size-normal"
              defaultValue={Price}
              variant="standard"
            />
            <TextField
              sx={{ m: 1, width: "35%" }}
              label="Period"
              onChange={OnChangeHandlerPeriod}
              id="standard-size-normal"
              defaultValue={Period}
              variant="standard"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "40px",
            }}
          >
            <p />
            <TextField
              sx={{ m: 1, width: "70%" }}
              multiline
              onChange={OnChangeHandlerDescription}
              id="outlined-multiline-flexible"
              label="Multiline"
              defaultValue={Description}
            />
          </div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "40px",
            }}
          >
            <TextField
              sx={{ m: 1, width: "35%" }}
              label="Size"
              id="standard-size-normal"
              defaultValue=""
              variant="standard"
            />
            <TextField
              sx={{ m: 1, width: "35%" }}
              label="Size"
              id="standard-size-normal"
              defaultValue=""
              variant="standard"
            />
          </div> */}
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button
              onClick={SubmuitHandler}
              style={{ right: 0, backgroundColor: "rgb(0 0 0)" }}
              sx={{ mt: 5 }}
              variant="contained"
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupBook

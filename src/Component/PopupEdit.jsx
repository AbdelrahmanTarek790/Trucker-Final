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
import ConstContext from "../store/const-context"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Alert, CircularProgress } from "@mui/material"
import axios from "axios"

const currencies = [
  {
    value: "الإسماعيلية",
    label: "الإسماعيلية",
  },
  {
    value: "الإسكندرية",
    label: "الإسكندرية",
  },

  {
    value: "كفر الشيخ",
    label: "كفر الشيخ",
  },
  {
    value: "أسوان",
    label: "أسوان",
  },
  {
    value: "أسيوط",
    label: "أسيوط",
  },
  {
    value: "الأقصر",
    label: "الأقصر",
  },
  {
    value: "الوادي الجديد",
    label: "الوادي الجديد",
  },
  {
    value: "شمال سيناء",
    label: "شمال سيناء",
  },
  {
    value: "البحيرة",
    label: "البحيرة",
  },
  {
    value: "بني سويف",
    label: "بني سويف",
  },
  {
    value: "بورسعيد",
    label: "بورسعيد",
  },
  {
    value: "البحر الأحمر",
    label: "البحر الأحمر",
  },
  {
    value: "الجيزة",
    label: "الجيزة",
  },
  {
    value: "الدقهلية",
    label: "الدقهلية",
  },
  {
    value: "جنوب سيناء",
    label: "جنوب سيناء",
  },
  {
    value: "دمياط",
    label: "دمياط",
  },
  {
    value: "سوهاج",
    label: "سوهاج",
  },
  {
    value: "السويس",
    label: "السويس",
  },
  {
    value: "الشرقية",
    label: "الشرقية",
  },
  {
    value: "الغربية",
    label: "الغربية",
  },
  {
    value: "الفيوم",
    label: "الفيوم",
  },
  {
    value: "القاهرة",
    label: "القاهرة",
  },
  {
    value: "القليوبية",
    label: "القليوبية",
  },
  {
    value: "قنا",
    label: "قنا",
  },
  {
    value: "مطروح",
    label: "مطروح",
  },
  {
    value: "المنوفية",
    label: "المنوفية",
  },
  {
    value: "المنيا",
    label: "المنيا",
  },
]

const category = [
  {
    value: "Air Compressors",
    label: "Air Compressors",
  },
  {
    value: "Cabin",
    label: "Cabin",
  },
  {
    value: "Cranes",
    label: "Cranes",
  },
  {
    value: "Dump truck",
    label: "Dump truck",
  },
  {
    value: "Earth Moving",
    label: "Earth Moving",
  },
  {
    value: "Material Handling",
    label: "Material Handling",
  },
  {
    value: "Motors",
    label: "Motors",
  },
]

const PopupEdit = (props) => {
  const Useritem = props.items
  const { t } = useTranslation()
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const [Error, setError] = useState(false)
  const [ErrorMsg, setErrorMsg] = useState("")
  const [IsReload, SetIsReload] = useState(false)
  const [photo, setPhoto] = useState(null)

  const onChangePhoto = (event) => {
    console.log(event)
    setPhoto(event.target.files[0])
    console.log(photo)
  }
  const [title, settitle] = useState(Useritem.title)
  const OnChangeHandler = (e) => {
    setError(false)
    settitle(e.target.value)
  }

  const [Price, setPrice] = useState(Useritem.price)
  const OnChangeHandlerPrice = (e) => {
    setError(false)
    setPrice(e.target.value)
  }
  const [Cat, setCat] = useState(Useritem.category)
  const OnChangeHandlerCat = (e) => {
    console.log(e.target.value)
    setCat(e.target.value)
  }

  const [Description, setDescription] = useState(Useritem.description)
  const OnChangeHandlerDescription = (e) => {
    setError(false)
    setDescription(e.target.value)
  }

  const [government, setgovernment] = useState(Useritem.government)
  const OnChangeHandlergovernment = (e) => {
    console.log(e.target.value)
    setgovernment(e.target.value)
  }

  const Submithandler = () => {
    SetIsReload(true)
    console.log(title)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", Description)
    formData.append("price", Price)
    formData.append("category", Cat)
    formData.append("government", government)
    axios
      .patch(`${Constant[0].url}/api/v1/equipments/${Useritem._id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        console.log(res)

        toast.success("Your item has been Edited successfully")
        SetIsReload("sheeesh")
        setTimeout(function () {
          window.location.reload(true)
        }, 3000)
      })
      .catch((error) => {
        console.log(error)
      })
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
          {Error && (
            <Alert style={{ marginBottom: "10px" }} severity="error">
              {ErrorMsg}
            </Alert>
          )}
          <div style={{ display: "grid", gridGap: "43px 28px" }}>
            <TextField
              id="outlined-basic"
              label={t("title")}
              value={title}
              onChange={OnChangeHandler}
              variant="outlined"
              style={{ gridColumnStart: "1", gridColumnEnd: "4" }}
            />
            <TextField
              id="outlined-textarea"
              label={t("Description")}
              value={Description}
              onChange={OnChangeHandlerDescription}
              placeholder="Placeholder"
              style={{ gridColumnStart: "1", gridColumnEnd: "4" }}
              multiline
            />
            <TextField
              id="outlined-select-currency-native"
              select
              label={t("government")}
              defaultValue={Useritem.government}
              onChange={OnChangeHandlergovernment}
              style={{ gridColumnStart: "1", gridColumnEnd: "2" }}
              SelectProps={{
                native: true,
              }}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency-native"
              select
              label={t("categories")}
              defaultValue={Useritem.category}
              style={{ gridColumnStart: "2", gridColumnEnd: "4" }}
              onChange={OnChangeHandlerCat}
              SelectProps={{
                native: true,
              }}
            >
              {category.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            {/* <div>
              <img src={Useritem.photo} width={350} />
              <input
                style={{ marginLeft: "50px" }}
                onChange={onChangePhoto}
                type="file"
                name="photo"
              />
            </div> */}
          </div>

          <FormControl error={Error} fullWidth sx={{ mt: 5 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">
              {t("price")}
            </InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              inputProps={{
                type: "number",
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={Price}
              onChange={OnChangeHandlerPrice}
            />
          </FormControl>

          {!IsReload && (
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button
                style={{ right: 0, backgroundColor: "#ffbc00" }}
                sx={{ mt: 5 }}
                variant="contained"
                onClick={Submithandler}
              >
                {t("Edit")}
              </Button>
            </div>
          )}
          {IsReload && (
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginTop: "25px",
                marginRight: "25px",
              }}
            >
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

export default PopupEdit

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../store/auth-context"
import { useContext } from "react"

const Filter = () => {
  const history = useHistory()
  const government = [
    {
      value: " ",
      label: "None",
    },
    {
      value: "الإسكندرية",
      label: "الإسكندرية",
    },
    {
      value: "الإسماعيلية",
      label: "الإسماعيلية",
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
      value: " ",
      label: "None",
    },
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
  const authCtx = useContext(AuthContext)
  const [Language, setLang] = useState(authCtx.lang)
  const [age, setAge] = useState("")
  const [Category, setCategory] = useState("")
  const [Goverment, setGoverment] = useState("")

  const GovermenthandleChange = (event) => {
    setGoverment(event.target.value)
  }
  const CategoryhandleChange = (event) => {
    setCategory(event.target.value)
  }
  const handleChange = (event) => {
    setAge(event.target.value)
  }

  const Submithandler = () => {
    if (Category.length > 2 && Goverment.length > 2) {
      history.replace(
        `/${
          !Language ? "ar" : "en"
        }/filter/category=${Category}&government=${Goverment}`
      )
    } else if (Category.length > 2) {
      history.replace(`/${!Language ? "ar" : "en"}/filter/category=${Category}`)
      console.log(Category)
    } else if (Goverment.length > 2) {
      history.replace(
        `/${!Language ? "ar" : "en"}/filter/government=${Goverment}`
      )
      console.log(Goverment)
    }
  }

  return (
    <center>
      <div
        className="Filterer"
        style={{
          marginTop: "50px",
          height: "60px",
          alignItems: "center",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="FilterGap"
          style={{ display: "flex", alignItems: "center", columnGap: "30px" }}
        >
          <Button onClick={Submithandler} variant="contained">
            Submit
          </Button>
          <div
            style={{ display: "flex", alignItems: "center", width: "216px" }}
          >
            <i style={{ fontSize: "25px" }} className="fa-solid fa-filter"></i>
            <FormControl
              style={{ backgroundColor: "white" }}
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Category}
                label="Category"
                displayEmpty
                onChange={CategoryhandleChange}
              >
                {category.map((key) => (
                  <MenuItem key={key.value} value={key.value}>
                    {key.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <i
              style={{ fontSize: "25px" }}
              className="fa-solid fa-earth-africa"
            ></i>
            <FormControl
              style={{ backgroundColor: "white" }}
              sx={{ m: 1, minWidth: 130 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Government</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Goverment}
                displayEmpty
                label="Government"
                onChange={GovermenthandleChange}
              >
                {government.map((key) => (
                  <MenuItem key={key.value} value={key.value}>
                    {key.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <i
              style={{ fontSize: "25px" }}
              className="fa-solid fa-truck-fast"
            ></i>
            <FormControl
              style={{ backgroundColor: "white" }}
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Truck Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Truck Type"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <i
            style={{
              position: "absolute",
              marginTop: "12px",
              marginLeft: "7px",
            }}
            className="fa-solid fa-magnifying-glass"
          ></i>
          <input
            className="FilterSearch"
            style={{
              textAlign: "right",
              borderRadius: "5px",
              height: "39px",
            }}
            placeholder="ما الذي تبحث عنه؟"
            type="search"
            name=""
            id=""
          />
        </div>
      </div>
    </center>
  )
}

export default Filter

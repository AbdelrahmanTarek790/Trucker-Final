import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import ConstContext from "../store/const-context"
import { useContext } from "react"
import { useEffect } from "react"
import ProdCard from "../Component/ProductCard"
import { useState } from "react"
import Footer from "../Component/Footer"

const CategoryPage = () => {
  let { catId } = useParams()
  const history = useHistory()
  const Constant = useContext(ConstContext)
  const [Items, setItems] = useState([
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
  const [IsReload, SetIsRaload] = useState(true)
  useEffect(() => {
    axios
      .get(`${Constant[0].url}/api/v1/truck?category=${catId}`, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        SetIsRaload(false)
        console.log(res)
        setItems(res.data.equipment.reverse())
        console.log(res)
      })
      .catch((error) => {
        history.replace("/error-404")
        console.log(error)
      })
  }, [])

  return (
    <div>
      <div
        className="wrapper"
        style={{
          paddingTop: "45px",
          backgroundColor: "#f1f1f1",
        }}
      >
        {!IsReload &&
          Items.map((data, index) => (
            <ProdCard items={data} key={index}></ProdCard>
          ))}
      </div>
      <div style={{ backgroundColor: "#f1f1f1" }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer></Footer>
    </div>
  )
}

export default CategoryPage

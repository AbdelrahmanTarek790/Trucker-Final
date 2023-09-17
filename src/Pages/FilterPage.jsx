import { useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import ConstContext from "../store/const-context"
import AuthContext from "../store/auth-context"
import { useEffect } from "react"
import axios from "axios"
import SkeletonCard from "../Component/SkeletonCard"
import { useState } from "react"
import ProdCard from "../Component/ProductCard"

const FilterPage = () => {
  let { filterId } = useParams()
  const [IsReload, SetIsRaload] = useState(true)
  const [HasData, SetHasData] = useState(false)
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

  const Constant = useContext(ConstContext)
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    document.title = "Explore"
    axios
      .get(`${Constant[0].url}/api/v1/Equipments?${filterId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: JSON.stringify(),
      })
      .then((res) => {
        console.log(res)
        setItems(res.data.equipment)
        SetHasData(true)
        SetIsRaload(false)
      })
      .catch((error) => {
        SetIsRaload(false)
        SetHasData(false)
      })
  }, [])
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <div
        className="wrapper"
        style={{
          paddingTop: "20px",
        }}
      >
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {IsReload && <SkeletonCard></SkeletonCard>}
        {!IsReload &&
          HasData &&
          Items.map((data, index) => (
            <ProdCard items={data} key={index}></ProdCard>
          ))}
      </div>
      <div>
        {!IsReload && !HasData && (
          <center>
            <h3>There is no posts yet!</h3>
          </center>
        )}
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
        <br /> <br />
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
    </div>
  )
}

export default FilterPage

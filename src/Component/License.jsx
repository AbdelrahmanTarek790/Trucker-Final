import { Cancel } from "@mui/icons-material"
import CropIcon from "@mui/icons-material/Crop"
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material"
import React, { useState, useContext } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./utils/cropImage"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import AuthContext from "../store/auth-context"
import ConstContext from "../store/const-context"

const License = ({
  photoURL,
  setOpenCrop,
  setPhotoURL,
  setFile,
  onSaveHandler,
}) => {
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [IsReload, setIsReload] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const date = new Date()
  function conv2EnNum(str) {
    return (
      parseFloat(
        str
          .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
            return d.charCodeAt(0) - 1632
          }) // Convert Arabic numbers
          .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
            return d.charCodeAt(0) - 1776
          }) // Convert Persian numbers
      ) * 1
    )
  }

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const cropImage = async () => {
    setIsReload(true)
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      )
      const formData = new FormData()

      formData.append("image", file)

      axios
        .post(`${Constant[0].url}/api/v1/users/ocr`, formData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res)
          console.log(res.data.ocrResult.split("\n"))
          const data = res.data.ocrResult.split("\n")
          let natid = ["", ""]
          for (let index = 0; index < data.length; index++) {
            if (
              data[index].length === 14 &&
              Number.isInteger(data[index] * 1)
            ) {
              natid[0] = data[index]
              console.log(natid)
            }
          }
          ////////////////////////////////////////////////////
          for (let index = 0; index < data.length; index++) {
            if (
              (data[index].includes("نهاية الترخيص") ||
                data[index].includes("الترخيص")) &&
              data[index].length > 22 &&
              data[index].includes("/") &&
              data[index].includes(":")
            ) {
              console.log(data[index].substring(15))
              let datas = data[index].substring(15).split("/")
              for (let index = 0; index < datas.length; index++) {
                datas[index] = conv2EnNum(datas[index])
              }
              let finalDate = datas[0] + "/" + datas[1] + "/" + datas[2]
              const gevienDate = new Date(finalDate)
              console.log(finalDate)
              if (date.getFullYear() < gevienDate.getFullYear()) {
                console.log(finalDate)
                natid[1] = finalDate
              }
            } else if (
              data[index].includes("نهاية الترخيص") &&
              data[index].length > 20 &&
              data[index].includes("-") &&
              data[index].includes(":")
            ) {
              console.log(data[index].substring(16))
              let datas = data[index].substring(16).split("-")

              for (let index = 0; index < datas.length; index++) {
                datas[index] = conv2EnNum(datas[index])
              }
              let finalDate = datas[2] + "/" + datas[1] + "/" + datas[0]
              console.log(finalDate)
              const givenDate = new Date(finalDate)
              console.log(givenDate.getFullYear())
              if (date.getFullYear() < givenDate.getFullYear()) {
                console.log(finalDate)
                natid[1] = finalDate
              }
              //  else {
              //   toast.error("Scan Another Image")
              // }
            }

            if (
              (data[index].includes("نهاية الترخيص") ||
                data[index].includes("الترخيص")) &&
              data[index].length > 22 &&
              data[index].includes("/") &&
              !data[index].includes(":")
            ) {
              console.log(data[index].substring(14))
              let datas = data[index].substring(14).split("/")
              for (let index = 0; index < datas.length; index++) {
                datas[index] = conv2EnNum(datas[index])
              }
              let finalDate = datas[0] + "/" + datas[1] + "/" + datas[2]
              const gevienDate = new Date(finalDate)
              console.log(finalDate)
              if (date.getFullYear() < gevienDate.getFullYear()) {
                console.log(finalDate)
                natid[1] = finalDate
              }
            } else if (
              data[index].includes("نهاية الترخيص") &&
              data[index].length > 20 &&
              data[index].includes("-") &&
              !data[index].includes(":")
            ) {
              console.log(data[index].substring(14))
              let datas = data[index].substring(14).split("-")

              for (let index = 0; index < datas.length; index++) {
                datas[index] = conv2EnNum(datas[index])
              }
              let finalDate = datas[2] + "/" + datas[1] + "/" + datas[0]
              console.log(finalDate)
              const givenDate = new Date(finalDate)
              console.log(givenDate.getFullYear())
              if (date.getFullYear() < givenDate.getFullYear()) {
                console.log(finalDate)
                natid[1] = finalDate
              }
              //  else {
              //   toast.error("Scan Another Image")
              // }
            }
          }
          const givenDate = new Date(natid[1])
          if (
            givenDate instanceof Date &&
            givenDate.getFullYear() > date.getFullYear() &&
            Number.isInteger(natid[0] * 1)
          ) {
            onSaveHandler(natid)
          } else {
            onSaveHandler("error")
          }

          setIsReload(false)
        })
        .catch((error) => {
          console.log(error)
          setIsReload(false)
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
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
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 400,
          width: "auto",
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={3 / 2}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        {!IsReload && (
          <div>
            <Box sx={{ width: "100%", mb: 1 }}>
              <Box>
                <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                <Slider
                  style={{ color: "#ffbc00" }}
                  valueLabelDisplay="auto"
                  valueLabelFormat={zoomPercent}
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                style={{ borderColor: "red", color: "red" }}
                onClick={() => setOpenCrop(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#ffbc00" }}
                startIcon={<CropIcon />}
                onClick={cropImage}
              >
                Change
              </Button>
            </Box>
          </div>
        )}
        {IsReload && (
          <CircularProgress style={{ marginRight: "50px", color: "#ffbc00" }} />
        )}
      </DialogActions>
    </>
  )
}

export default License

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`
}

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

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
  const authCtx = useContext(AuthContext)
  const Constant = useContext(ConstContext)
  const Url = Constant.url
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [IsReload, setIsReload] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

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

      formData.append("avatar", file)

      axios
        .patch(`${Constant[0].url}/api/v1/users/updateMe/`, formData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authCtx.token}`,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === "success") {
            toast.success(
              "Your Profile Picture has been changed successfully !"
            )
            setIsReload(false)
            localStorage.removeItem("avatar")
            localStorage.setItem("avatar", res.data.updatedUser.avatar)
            setTimeout(() => {
              window.location.reload(true)
            }, 1000)
          }
        })
        .catch((error) => {
          console.log(error)
          setIsReload(false)
          toast.error(
            "You need to logout and login again to change the account info"
          )
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
          aspect={1}
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
              <Box>
                <Typography>Rotation: {rotation + "°"}</Typography>
                <Slider
                  style={{ color: "#ffbc00" }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={360}
                  value={rotation}
                  onChange={(e, rotation) => setRotation(rotation)}
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

export default CropEasy

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`
}

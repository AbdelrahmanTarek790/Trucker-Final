import { Language } from "@mui/icons-material"
import React from "react"
import { useState, createContext } from "react"

const ConstContext = createContext([
  {
    url: "https://truker.genius0x1.com",
  },
  {
    "64498aa6db60baf726212fb9": "truck",
    "64498ac2db60baf726212fbb": "truck",
    "64498b04db60baf726212fbd": "truck",
    "64498e8edb60baf726212fc0": "truck",
  },
])

export const ConstContextProvider = (props) => {
  const contextValue = [
    {
      url: "https://truker.genius0x1.com",
    },
    {
      "64498aa6db60baf726212fb9": "truck",
      "64498ac2db60baf726212fbb": "truck",
      "64498b04db60baf726212fbd": "truck",
      "64498e8edb60baf726212fc0": "truck",
    },
  ]

  return (
    <ConstContext.Provider value={contextValue}>
      {props.children}
    </ConstContext.Provider>
  )
}
export default ConstContext

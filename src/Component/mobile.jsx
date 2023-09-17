import React from "react"
import "./css/main.css"
import "./css/Nav.css"
import "bootstrap/dist/css/bootstrap.css"
import "./css/LowP.css"
import Android from "../Images/Android-Badge_Black.png"
import IOS from "../Images/Steamy-Concepts-Mobile-App-Store-Apple-iOS.png"
import mobile1 from "../Images/smartphone-and-mobile-phone-free-png.png"

function Mobile() {
  return (
    <div className="MoblieVer">
      <div
        style={{
          display: "flex",
          justifyContent: " space-evenly",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <div style={{ width: "50%" }}>
          <h2>Download</h2>
          <h2>our Application!</h2>
          <br></br>
          <br></br>
          <h3 style={{ textAlign: "center" }}>For Android</h3>
          <a className="Href" style={{ marginLeft: "15%" }}>
            <img
              src={Android}
              style={{ width: "70%" }}
              alt="netflix-font"
              border="0"
            />
          </a>
          <br></br>
          <br></br>

          <h3 style={{ textAlign: "center" }}>For iphone</h3>
          <a className="Href" style={{ marginLeft: "15%" }}>
            <img
              src={IOS}
              style={{ width: "70%" }}
              alt="netflix-font"
              border="0"
            />
          </a>
        </div>

        <img
          src={mobile1}
          style={{ width: "45%" }}
          alt="netflix-font"
          border="0"
        />
      </div>
    </div>
  )
}

export default Mobile

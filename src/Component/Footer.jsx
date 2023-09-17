import React from "react"
import "./css/main.css"
import "./css/Nav.css"
import "bootstrap/dist/css/bootstrap.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
//import { } from '@fortawesome/free-solid-svg-icons'
import {
   faFacebook,
   faTwitter,
   faInstagram,
} from "@fortawesome/free-brands-svg-icons"
function Footer() {
   return (
      <section className="footer footlow" id="6">
         <div className="container">
            <div className="row footer-cont">
               <div className="col-12 col-md">
                  <h3>
                     <a href={"http://localhost:3000/"} className="foot" id="7">
                        About Us
                     </a>
                  </h3>
                  <p>Subscribe to receive all our news.</p>
               </div>

               <div className="col-12 col-md">
                  <h4>Connect With Us</h4>
                  <ul className="socil list-unstyled">
                     <li>
                        <a href={"http://localhost:3000/"} aria-hidden="true">
                           <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                        </a>
                     </li>
                     <li>
                        <a href={"http://localhost:3000/"} aria-hidden="true">
                           <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                        </a>
                     </li>
                     <li>
                        <a href={"http://localhost:3000/"}>
                           <FontAwesomeIcon
                              icon={faInstagram}
                           ></FontAwesomeIcon>
                        </a>
                     </li>
                     <li>
                        <a href={"http://localhost:3000/"}>
                           <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
            <div className="row text-center"></div>
         </div>
      </section>
   )
}

export default Footer

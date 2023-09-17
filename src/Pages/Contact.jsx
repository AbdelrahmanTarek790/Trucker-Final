import { Fragment } from "react"
import "./css/Contact.css"
import { useTranslation } from "react-i18next"
function Contact() {
  const { t } = useTranslation()
  return (
    <Fragment style={{ backgroundColor: "#f1f1f1", paddingTop: "30px" }}>
      <section className="contact">
        <div className="contact-heading">
          <h2>Contact Us</h2>
        </div>

        <div className="contact-container">
          <div className="contact-row">
            <div className="contact-column">
              <div className="contact-widget">
                <div className="contact-widget-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Address</h5>
                    <p>20 w 34th St., New York, NY 10001, United States</p>
                  </div>
                </div>
                <div className="contact-widget-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Contact Us</h5>
                    <p>125-711-811 | 125-668-886</p>
                  </div>
                </div>

                <div className="contact-widget-item">
                  <div className="contact-icon">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Mail</h5>
                    <p>Your.support@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-column">
              <div className="contact-form">
                <form action="#" className="contact-form">
                  <input type="text" placeholder="Name" />
                  <input type="email" placeholder="Email" />
                  <textarea placeholder="Comment"></textarea>
                  <button type="submit" className="contact-site-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Contact

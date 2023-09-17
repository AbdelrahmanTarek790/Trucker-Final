import { useState } from "react"
import { useContext } from "react"
import AuthContext from "../store/auth-context"
import { Link } from "react-router-dom"

const Error404 = () => {
  const Authcont = useContext(AuthContext)
  const [Language, setLang] = useState(Authcont.lang)
  return (
    <main style={{ placeItems: "center", paddingBottom: "300px" }}>
      <div style={{ marginTop: "200px" }} className="text-center">
        <h1>404</h1>
        <h1>Page not found</h1>
        <p>Sorry, we couldn’t find the page you’re looking for.</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            columnGap: "1.5rem",
            alignItems: "center",
            marginTop: "2.5rem",
          }}
        >
          <Link to={`/${!Language ? "ar" : "en"}/`} className="Contactbutton">
            Go back home
          </Link>
          <Link to={`/${!Language ? "ar" : "en"}/contact`}>
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Error404

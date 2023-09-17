import "./App.css"

import Header from "./Component/Header"
import MainP from "./Component/midpage"
import Footer from "./Component/Footer"
import { useContext, useState } from "react"
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom"
import SignIn from "./Pages/signin"
import SignUp from "./Pages/signup"
import AuthContext from "./store/auth-context"
import Explore from "./Pages/explore"
import Contact from "./Pages/Contact"
import { isBrowser } from "react-device-detect"
import { isMobileOnly } from "react-device-detect"
import Profile from "./Pages/profile"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Forget from "./Pages/forgetpassword"
import Rest from "./Pages/RestPassword"
import { useParams } from "react-router-dom"
import Detailsitems from "./Pages/details"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslations from "./lang/en.json"
import arTranslations from "./lang/ar.json"
import CategoryPage from "./Pages/categoryPage"
import FilterPage from "./Pages/FilterPage"
import Error404 from "./Component/error"
import Mobile from "./Component/mobile"
import { useEffect } from "react"
import MoblieMainPage from "./Moblile-Component/MoblieMainPage"
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material"
import MobileSignIn from "./Moblile-Component/Mobilesignin"
import Mobilesignup from "./Moblile-Component/Mobilesignup"
import Mobiledetails from "./Moblile-Component/Mobiledetails"
import Mobileforgetpassword from "./Moblile-Component/Mobileforgetpassword"
import MobileRestPassword from "./Moblile-Component/MobileRestPassword"
import MobileExplore from "./Moblile-Component/MobileExplore"
import MobileProfile from "./Moblile-Component/MobileProfile"
import MobileHeader from "./Moblile-Component/MobileHeader"
import VerifyScreen from "./Pages/Verify"

function App() {
  const authCtx = useContext(AuthContext)
  const [value, setValue] = useState(0)
  const [Language, setLang] = useState(authCtx.lang)
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    lng: !Language ? "ar" : "en",
    fallbackLng: "en",
  })

  return (
    <BrowserRouter>
      {!isMobileOnly &&
        (authCtx.verified === "true" || authCtx.verified === null) && (
          <Switch>
            <Route exact path={`/${!Language ? "ar" : "en"}`}>
              <Header></Header>
              <MainP></MainP>
              <div className="Howpage">
                <Mobile></Mobile>
              </div>
              <Footer className="footer"></Footer>
            </Route>

            <Route path={`/${!Language ? "ar" : "en"}/contact`}>
              <Header></Header>
              <Contact />
              <Footer className="footer"></Footer>
            </Route>

            <Route path={`/${!Language ? "ar" : "en"}/explore`}>
              <Explore></Explore>
            </Route>

            {!authCtx.isLoggedIn && (
              <Route path={`/${!Language ? "ar" : "en"}/forget`}>
                <Forget></Forget>
              </Route>
            )}

            {!authCtx.isLoggedIn && (
              <Route path={`/resetPassword/:userId`}>
                <Rest></Rest>
              </Route>
            )}

            <Route path={`/${!Language ? "ar" : "en"}/details/:itemId`}>
              <Detailsitems></Detailsitems>
            </Route>

            <Route path={`/${!Language ? "ar" : "en"}/category/:catId`}>
              <Header></Header>
              <CategoryPage></CategoryPage>
            </Route>

            <Route path={`/${!Language ? "ar" : "en"}/filter/:filterId`}>
              <Header></Header>
              <FilterPage></FilterPage>
            </Route>

            {authCtx.isLoggedIn && (
              <Route path={`/${!Language ? "ar" : "en"}/profile`}>
                <Profile></Profile>
              </Route>
            )}

            {!authCtx.isLoggedIn && (
              <Route path={`/${!Language ? "ar" : "en"}/login`}>
                <SignIn></SignIn>
              </Route>
            )}

            {!authCtx.isLoggedIn && (
              <Route path={`/${!Language ? "ar" : "en"}/register`}>
                <SignUp></SignUp>
              </Route>
            )}

            <Route path={`/${!Language ? "ar" : "en"}/error-404`}>
              <Header></Header>
              <Error404></Error404>
              <Footer></Footer>
            </Route>

            <Route exact path={`/${!Language ? "ar/verify/" : "en/verify/"}`}>
              <Redirect to={`/${!Language ? "ar" : "en"}`}></Redirect>
            </Route>

            <Route exact path="/">
              <Redirect to={`/${!Language ? "ar" : "en"}`}></Redirect>
            </Route>

            <Route path="*">
              <Redirect to={`/${!Language ? "ar" : "en"}/error-404`}></Redirect>
            </Route>
          </Switch>
        )}

      {!isMobileOnly && authCtx.verified === "false" && (
        <Switch>
          <Route path={`/${!Language ? "ar/verify/" : "en/verify/"}`}>
            <VerifyScreen></VerifyScreen>
          </Route>

          <Route path="*">
            <Redirect
              to={`/${!Language ? "ar/verify/" : "en/verify/"}`}
            ></Redirect>
          </Route>
        </Switch>
      )}
      {isMobileOnly && (
        <div>
          <Switch>
            <Route exact path={`/${!Language ? "ar" : "en"}`}>
              <MoblieMainPage></MoblieMainPage>
            </Route>
            <Route path={`/${!Language ? "ar" : "en"}/explore`}>
              <MobileExplore></MobileExplore>
            </Route>
            <Route path={`/${!Language ? "ar" : "en"}/details/:itemId`}>
              <Mobiledetails></Mobiledetails>
            </Route>
            <Route path={`/${!Language ? "ar" : "en"}/login`}>
              <MobileSignIn></MobileSignIn>
            </Route>
            <Route path={`/${!Language ? "ar" : "en"}/register`}>
              <Mobilesignup></Mobilesignup>
            </Route>
            <Route path={`/${!Language ? "ar" : "en"}/resetPassword/:userId`}>
              <MobileRestPassword></MobileRestPassword>
            </Route>
            <Route path={`/${!Language ? "ar" : "en"}/forget`}>
              <Mobileforgetpassword></Mobileforgetpassword>
            </Route>
            <Route path={`/${!Language ? "ar" : "en"}/contact`}>
              <Contact />
            </Route>
            <Route path={`/${!Language ? "ar" : "en"}/profile`}>
              <MobileHeader></MobileHeader>
              <MobileProfile></MobileProfile>
            </Route>
            <Route path="*">
              <Redirect to={`/${!Language ? "ar" : "en"}`}></Redirect>
            </Route>
          </Switch>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App

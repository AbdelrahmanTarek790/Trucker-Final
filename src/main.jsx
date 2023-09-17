import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { AuthContextProvider } from "./store/auth-context"
import { ConstContextProvider } from "./store/const-context"

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConstContextProvider>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </ConstContextProvider>
)

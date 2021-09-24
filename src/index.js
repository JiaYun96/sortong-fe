import { ThemeProvider } from "@material-ui/styles"
import { CookiesProvider } from 'react-cookie'
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { theme } from "./theme"
require('dotenv').config()

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById("root")
)

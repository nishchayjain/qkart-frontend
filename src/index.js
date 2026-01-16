// CRIO_SOLUTION_START_MODULE_REGISTER
// CRIO_SOLUTION_END_MODULE_REGISTER
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";

// TODO: CRIO_TASK_MODULE_REGISTER - Add Target container ID (refer public/index.html)
ReactDOM.render(
  <React.StrictMode>
    {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        >
          <App />
        </SnackbarProvider>
        {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
      </ThemeProvider>
    </BrowserRouter>
    {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
  </React.StrictMode>,
  // CRIO_UNCOMMENT_START_MODULE_REGISTER
  // document.getElementById('')
  // CRIO_UNCOMMENT_END_MODULE_REGISTER
  // CRIO_SOLUTION_START_MODULE_REGISTER
  document.getElementById("root")
  // CRIO_SOLUTION_END_MODULE_REGISTER
);

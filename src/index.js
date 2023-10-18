import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client"
import App from "./App";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "#1d5393",
          },
          "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            color: "#1d5393",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#1d5393",
            },
          "& .MuiIconButton-root": {
            color: "#1d5393", // Change the color of the icon
          },
        },
      },
    },
  },
});

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  BrowserRouter,
} from "react-router-dom";
import store, { persistor } from "./store/index";
import App from "./App";

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:before": { // underline color when textfield is inactive
          borderBottomColor: "#697785",
          backgroundColor: "#697785",
          height: "1px",
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid #FFFFFF`,
        },
        "&:hover:not($disabled):after": { // underline color when hovered
          borderBottomColor: "#df691a",
          backgroundColor: "#df691a",
          height: "1px",
        },
        "&:after": {
          borderBottomColor: "#df691a",
          backgroundColor: "#df691a",
          height: "1px",
        },
        disabled: {
        },
      },
      focused: {
        "&:before": { // underline color when textfield is inactive
          borderBottomColor: "#df691a",
          height: "1px",
        },
        "&:hover:not($disabled):before": { // underline color when hovered
          borderBottomColor: "#df691a", height: "1px",
        },
        "&:after": {
          borderBottomColor: "#df691a", height: "1px",
        },
      },
    },
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

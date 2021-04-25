import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import RTL from "./RTL";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { cyan } from "@material-ui/core/colors";

const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ["Varela Round", 'Arial', 'sans-serif'].join(',')
  },
  palette: {
    type: 'light',
    primary: {
      main: cyan[500],
    },
    secondary: {
      light: '#f6a5c0',
      main: '#f48fb1',
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <RTL>
            <App />
          </RTL>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

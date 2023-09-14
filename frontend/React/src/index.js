import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00E1AB", // 여기에 원하는 primary 색상을 지정합니다.
    },
    warning: {
      main: "#FA6666",
    },
  },
  typography: {
    fontFamily: "NanumSquareRound, sans-serif",
  },
});

// 밑에 코드는 모바일에서 0.3초 이내로 2번 탭 시에 화면이 확대되는걸 방지해주는 코드라고 함.
// 혹시 나중에 더블탭으로 확대될지 몰라서 일단 넣어둠.

// document.documentElement.addEventListener(
//   "touchstart",
//   function (event) {
//     if (event.touches.length > 1) {
//       event.preventDefault();
//     }
//   },
//   false
// );

// var lastTouchEnd = 0;

// document.documentElement.addEventListener(
//   "touchend",
//   function (event) {
//     var now = new Date().getTime();
//     if (now - lastTouchEnd <= 300) {
//       event.preventDefault();
//     }
//     lastTouchEnd = now;
//   },
//   false
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

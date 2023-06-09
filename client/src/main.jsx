import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./helpers/ScrollToTop";
import LoadingIcon from "./components/LoadingIcon";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      <PersistGate loading={<LoadingIcon />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

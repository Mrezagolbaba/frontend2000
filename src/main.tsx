import React from "react";
import ReactDOM from "react-dom/client";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration.tsx";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persister, store } from "store/store.ts";
import TagManager from "react-gtm-module";
import "./sentry.ts"

import "assets/scss/index.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PersistGate } from "redux-persist/integration/react";


const tagManagerArgs = {
  gtmId: "GTM-WRSW3TKG", // Replace with your GTM container ID
};

TagManager.initialize(tagManagerArgs);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
serviceWorkerRegistration.register();

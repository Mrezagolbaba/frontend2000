import React from "react";
import ReactDOM from "react-dom/client";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration.tsx";
import App from "./App.tsx";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import { persister, store } from "store/store.ts";
import TagManager from 'react-gtm-module';

import "assets/scss/index.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PersistGate } from "redux-persist/integration/react";

Sentry.init({
  dsn: "https://471c3edaafc4ceda011aec9a5263fc88@o208701.ingest.sentry.io/4505642858119168",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        "localhost",
        /^https:\/\/dev-api\.arsonex\.market\//,
        /^https:\/\/staging-api\.arsonex\.market\//,
        /^https:\/\/api\.arsonex\.com\//,
      ],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  autoSessionTracking: true,
});

const tagManagerArgs = {
  gtmId: 'GTM-WRSW3TKG', // Replace with your GTM container ID
};

TagManager.initialize(tagManagerArgs);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
serviceWorkerRegistration.register();

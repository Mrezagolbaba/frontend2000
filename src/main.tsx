import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persister, store } from "store/store.ts";
import TagManager from "react-gtm-module";

import "assets/scss/index.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PersistGate } from "redux-persist/integration/react";

const tagManagerArgs = {
  gtmId: "GTM-WRSW3TKG", // Replace with your GTM container ID
};
Sentry.init({
  dsn: "https://2874ea1120cfbc93c7e66586b9afb209@o4506688238780416.ingest.us.sentry.io/4507340175966208",
  integrations: [
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    // /^https:\/\/dev-api\.paydirham\.me\//,
    // /^https:\/\/staging-api\.paydirham\.me\//,
    /^https:\/\/api\.arsonex\.com\//,
  ],
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

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

import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./assets/css/app.css";
import "./assets/css/custom.css";
import "./assets/vendor/bootstrap-select/bootstrap-select.min.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";
Sentry.init({
  dsn: "https://471c3edaafc4ceda011aec9a5263fc88@o208701.ingest.sentry.io/4505642858119168",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost",/^https:\/\/dev-api\.arsonex\.market\//,/^https:\/\/staging-api\.arsonex\.market\//,/^https:\/\/api\.arsonex\.com\//],
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

const container = document.getElementById("root");
const root = createRoot(container as any);
root.render(<App />);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
serviceWorkerRegistration.register();

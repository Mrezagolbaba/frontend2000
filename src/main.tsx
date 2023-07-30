import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/app.css';
import './assets/css/custom.css';
import './assets/vendor/bootstrap-select/bootstrap-select.min.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App.tsx';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
serviceWorkerRegistration.register();
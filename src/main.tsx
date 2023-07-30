import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/app.css';
import './assets/css/custom.css';
import './assets/vendor/owlcarousel/owl.carousel.min.css'
import './assets/vendor/owlcarousel/owl.theme.default.min.css'
import './assets/vendor/bootstrap-select/bootstrap-select.min.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import App from './App.tsx';
import AppRouter from './router/AppRouter.tsx';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
serviceWorkerRegistration.register();
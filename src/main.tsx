import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/app.css';
import './assets/css/custom.css';
import './assets/vendor/owlcarousel/owl.carousel.min.css'
import './assets/vendor/owlcarousel/owl.theme.default.min.css'
import './assets/vendor/bootstrap-select/bootstrap-select.min.css'
import "./../node_modules/slick-carousel/slick/slick.css"; 
import "./../node_modules/slick-carousel/slick/slick-theme.css";
import 'react-spring-bottom-sheet/dist/style.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App.tsx';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
serviceWorkerRegistration.register();
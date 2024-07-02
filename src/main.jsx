import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
 import Cadastro from './cadastro'
 import AppRoutes from './route/route.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="266963174901-1ro8upe7tgfc77pbba8pktf4qoorajit.apps.googleusercontent.com">
    <AppRoutes />
      </GoogleOAuthProvider>;
  </React.StrictMode>,
)

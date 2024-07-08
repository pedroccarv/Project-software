import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './route/route';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="266963174901-1ro8upe7tgfc77pbba8pktf4qoorajit.apps.googleusercontent.com">
      <AppRoutes />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);

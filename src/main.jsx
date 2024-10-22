import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './route/route';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './services/AuthContext'; // Adicione isso

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="266963174901-1ro8upe7tgfc77pbba8pktf4qoorajit.apps.googleusercontent.com">
    <AuthProvider> {/* Adicione o AuthProvider */}
        <AppRoutes />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);

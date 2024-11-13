import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../services/AuthContext'; // Atualize para usar o hook useAuth

function AdminRoute({ children }) {
  const { user } = useAuth(); // Usar o hook para pegar o usuário autenticado

  if (!user) {
    // Redireciona para login se não estiver autenticado
    return <Navigate to="/login" />;
  }

  if (!user.isAdmin) {
    // Redireciona para a página principal se o usuário não for admin
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
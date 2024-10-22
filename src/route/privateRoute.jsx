import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext'; // Importa o hook de autenticação

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Aqui, 'user' deve ser o estado que indica se o usuário está logado

  // Se o usuário não estiver logado, redireciona para a página de login
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

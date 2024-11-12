import React, { useState } from 'react';
import axios from 'axios';

const LoginAdm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/login', { username, password });
      if (response.status === 200) {
        // Redireciona para o dashboard do admin após login bem-sucedido
        window.location.href = '/admin/dashboard';
      }
    } catch (error) {
      setErrorMessage('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login de Administrador</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default LoginAdm;

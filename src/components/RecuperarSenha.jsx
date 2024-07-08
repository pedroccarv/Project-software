import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecuperarSenha.css';

function RecuperarSenha() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para recuperar senha
    console.log("Recuperar senha para:", email);
  };

  return (
    <div className="container">
      <h1>Recuperar Senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn-recuperar">Enviar</button> 
      </form>
    </div>
  );
}

export default RecuperarSenha;
import React, { useState } from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleLembrarChange = (event) => {
    setLembrar(event.target.checked);
  };

  const handleEntrarClick = () => {
    // Validação de email e senha
    if (email && senha) {
      // Redirecionamento para a página principal
      window.location.href = '/';
    } else {
      alert('Preencha os campos de email e senha');
    }
  };

  return (
    <div className="login-container">
      <img src="src/images/logo.png" alt="" width="60%" />
      <span></span>
      <h1>Faça login na sua conta </h1>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Digite seu email" />
        <br />
        <label>Senha:</label>
        <input type="password" value={senha} onChange={handleSenhaChange} placeholder="Digite sua senha" />
        <br />
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
        <label>Lembre-me:</label>
        <input type="checkbox" checked={lembrar} onChange={handleLembrarChange} />
        <br />
        <button onClick={handleEntrarClick}>Entrar</button>
      </form>
      <p>Esqueceu a senha? <a href="#" onClick={() => alert('Funcionalidade em desenvolvimento')}>Clique aqui</a></p>
      <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link></p>
    </div>

  );

}
export default Login;

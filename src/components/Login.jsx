import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

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
      <Link to="/"></Link>
    } else {
      alert('Preencha os campos de email e senha');
    }
  };

  return (
    <div>
      <div className="rotas">
      <Link to="/login" className="link-rota">Login</Link>
      <Link to="/cadastro" className="link-rota">Cadastro</Link>
      <Link to="/editar-perfil" className="link-rota">Editar Perfil</Link>
      <Link to="/mapa" className="link-rota">Mapa</Link>
      <Link to="/favoritar-partida" className="link-rota">Partidas Favoritas</Link>
      <Link to="/detalhes-partida" className="link-rota">Detalhes Partidas</Link>
      <Link to="/cadastro-partida" className="link-rota">Cadastro Partidas</Link>
      <Link to="/historico-partidas" className="link-rota">Historico Partidas</Link>
      <Link to="/pagamento" className="link-rota">Pagamento</Link>
      <Link to="/contato" className="link-rota">Contato</Link></div>     
    <div className="login-container">
      <img src="src/images/logo.png" alt="" width="60%" />
      <span></span>
      <h1>Faça login na sua conta</h1>
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
      <p>Esqueceu a senha? <Link to="/recuperar-senha">Clique aqui</Link></p>
      <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link></p>
    </div>
  </div>  
  );
}

export default Login;
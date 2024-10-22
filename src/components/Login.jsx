import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../styles/Login.css';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleLembrarChange = (event) => {
    setLembrar(event.target.checked);
  };

  const handleEntrarClick = async (e) => {
    e.preventDefault();
    if (email && senha) {
      try {
        const response = await api.post('/login', { email, password: senha });
        if (response && response.data) {
          localStorage.setItem('userId', response.data.id);
          login(response.data);
          alert('Login bem-sucedido!');
          navigate('/'); // Usar navigate para redirecionar
        } else {
          throw new Error('Resposta inválida da API');
        }
      } catch (error) {
        alert('Erro ao fazer login: ' + (error.response?.data?.error || error.message));
      }
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
        <Link to="/contato" className="link-rota">Contato</Link>
        <Link to="/historico-conquistas" className="link-rota">Historico conquistas</Link>
        <Link to="/notificacoes" className="link-rota">Notificacoes</Link>
        <Link to="/chat" className="link-rota">Chat</Link>
        <Link to="/upload-imagem" className="link-rota">Imagem</Link>
        <Link to="/avaliacao-partida" className="link-rota">Avaliacao partida</Link>
        <Link to="/convidar-amigos" className="link-rota">Convidar amigos</Link>
      </div>     
      <div className="login-container">
        <img src="src/images/logo.png" alt="" width="60%" />
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

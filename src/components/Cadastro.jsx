import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cadastro.css';
import api from '../services/api';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [age, setAge] = useState('');

  const inputEmail = useRef()
  const inputAge = useRef()
  const inputNome = useRef()
  const inputPassword = useRef()

  async function createUsers() {
    try {
      await api.post('/usuarios', {
        name: nome,
        age: age,
        email: email,
        password: password,  // Certifique-se de que está enviando "password"
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao criar usuário");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== verifyEmail) {
      alert("Os e-mails não coincidem!");
      return;
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
        <Link to="/historico-conquistas" className="link-rota">Historico  conquistas</Link>
        <Link to="/notificacoes" className="link-rota">Notificacoes</Link>
        <Link to="/chat" className="link-rota">Chat</Link>
        <Link to="/upload-imagem" className="link-rota">Imagem</Link>
        <Link to="/avaliacao-partida" className="link-rota">Avaliacao partida</Link>
        <Link to="/convidar-amigos" className="link-rota">Convidar amigos</Link>
      </div>
      <img src="src/images/logo.png" alt="" width="60%" />
      <span></span>
      <div className="cadastro">
        <h1>Crie uma conta</h1>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            ref={inputNome}
            required
          />
          <input
            type="number"
            placeholder="Idade"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            ref={inputAge}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={inputEmail}
            required
          />
          <input
            type="email"
            placeholder="Verifique seu e-mail"
            value={verifyEmail}
            onChange={(e) => setVerifyEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={inputPassword}
            required
          />
          <button type="submit"  onClick={createUsers} className="btn-cadastrar">Criar perfil gratuito</button>
        </form>
        <p className="terms">
          Ao se registrar, você está de acordo com nossos <a href="#">termos e condições</a> e confirma estar ciente de nossa <a href="#">política de privacidade</a>.
        </p>
        <p className="login">
          Já tem uma conta? <Link to="/login">Faça seu login!</Link>
        </p>
      </div>

    </div>
  );
}

export default Cadastro;

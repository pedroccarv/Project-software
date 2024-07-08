import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cadastro.css';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== verifyEmail) {
      alert("Os e-mails não coincidem!");
      return;
    }
    // Adicione a lógica para lidar com o cadastro aqui
    console.log("E-mail:", email);
    console.log("Senha:", senha);
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
    <div className="container">
      <img src="src/images/logo.png" alt="" width="60%" />
      <span></span>
      <div className="cadastro">
        <h1>Crie uma conta</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
          <button type="submit" className="btn-cadastrar">Criar perfil gratuito</button>
        </form>
        <p className="terms">
          Ao se registrar, você está de acordo com nossos <a href="#">termos e condições</a> e confirma estar ciente de nossa <a href="#">política de privacidade</a>.
        </p>
        <p className="login">
          Já tem uma conta? <Link to="/login">Faça seu login!</Link>
        </p>
      </div>
    </div>
  </div>  
  );
}

export default Cadastro;

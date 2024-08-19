import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';    
import axios from 'axios';
import '../styles/editarPerfil.css';

function EditarPerfil() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  useEffect(() => {
    // Chamada à API para obter os dados do usuário
    axios.get('/api/usuario')
      .then(response => {
        setUsuario(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os dados do usuário:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chamada à API para atualizar os dados do usuário
    axios.put('/api/usuario', usuario)
      .then(response => {
        alert('Perfil atualizado com sucesso!');
      })
      .catch(error => {
        console.error("Houve um erro ao atualizar o perfil:", error);
      });
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
    <div className="container">
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="editar-form">
        <input 
          type="text" 
          name="nome" 
          placeholder="Nome" 
          value={usuario.nome} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={usuario.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="senha" 
          placeholder="Senha" 
          value={usuario.senha} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" className="btn-atualizar">Atualizar</button>
      </form>
    </div>
  </div>  
  );
}

export default EditarPerfil;
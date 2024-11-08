import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/editarPerfil.css';

function EditarPerfil() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  // Função para buscar os dados do usuário
  async function getUser(id) {
    try {
      const response = await api.get(`/usuarios/${id}`);
      setUsuario({
        nome: response.data.name, // Ajuste conforme a estrutura da resposta da API
        email: response.data.email,
        senha: '' // Opcional: deixe o campo de senha vazio para segurança
      });
    } catch (error) {
      console.error("Houve um erro ao buscar os dados do usuário:", error);
    }
  }

  useEffect(() => {
    const usuarioId = 1; // ID do usuário; idealmente, obtenha do contexto ou autenticação
    getUser(usuarioId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioId = 1; // ID do usuário

    try {
      await api.put(`/usuarios/${usuarioId}`, usuario);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error("Houve um erro ao atualizar o perfil:", error);
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

      <div className="container">
        <h1>Seu perfil</h1>
        <form onSubmit={handleSubmit} className="editar-form">
          <input 
            type="text" 
            name="nome" 
            placeholder="Nome" 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={usuario.nome || ''} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={usuario.email || ''} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="senha" 
            placeholder="Senha"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={usuario.senha || ''} 
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

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FavoritarPartida({ partidaId }) {
  const handleFavoritar = () => {
    axios.post('/api/favoritos', { partidaId })
      .then(response => {
        alert('Partida favoritada com sucesso!');
      })
      .catch(error => {
        console.error("Houve um erro ao favoritar a partida:", error);
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
      <button onClick={handleFavoritar} className="btn-favoritar">
      Favoritar
    </button>
    </div>

  );
}

export default FavoritarPartida;
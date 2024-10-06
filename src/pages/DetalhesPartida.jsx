import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mapa from '../components/Mapa';
import '../styles/DetalhesPartida.css';

function DetalhesPartida() {
  const { id } = useParams();
  const [partida, setPartida] = useState(null);

  useEffect(() => {
    axios.get(`/api/partidas/${id}`)
      .then(response => {
        setPartida(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os detalhes da partida:", error);
      });
  }, [id]);

  if (!partida) return <div>Carregando...</div>;

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
      <h1>{partida.nome}</h1>
      <p>{partida.data}</p>
      <p>{partida.local}</p>
      <p>{partida.tipoEsporte}</p>
      <Mapa latitude={partida.latitude} longitude={partida.longitude} />
    </div>
    </div>

  );
}

export default DetalhesPartida;

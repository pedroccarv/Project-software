import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function BeachTennisScheduler() {
  const [matches, setMatches] = useState([]);
  const [newMatch , setNewMatch] = useState({
    date: '',
    time: '',
    player1: '',
    player2: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setMatches([...matches, newMatch]);
    setNewMatch({
      date: '',
      time: '',
      player1: '',
      player2: '',
    });
  };

  const handleInputChange = (event) => {
    setNewMatch({ ...newMatch, [event.target.name]: event.target.value });
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
        <Link to="/agendar" className="link-rota">Agendar</Link>
        </div>
        <div> 
      <h1>Beach Tennis Scheduler</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={newMatch.date} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Time:
          <input type="time" name="time" value={newMatch.time} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Player 1:
          <input type="text" name="player1" value={newMatch.player1} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Player 2:
          <input type="text" name="player2" value={newMatch.player2} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Schedule Match</button>
      </form>
      <h2>Scheduled Matches:</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            {match.date} at {match.time} - {match.player1} vs {match.player2}
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
}

export default BeachTennisScheduler;
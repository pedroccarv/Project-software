import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/partidas.css';

function Partidas() {
  const [partidas, setPartidas] = useState([]);
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [tipoEsporte, setTipoEsporte] = useState('');

  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/partidas');
        setPartidas(response.data);
      } catch (error) {
        console.error("Houve um erro ao buscar as partidas:", error);
      }
    };

    fetchPartidas();
  }, []);

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:4000/partidas', {
        params: {
          data,
          local,
          tipoEsporte
        }
      });
      setPartidas(response.data);
    } catch (error) {
      console.error("Houve um erro ao filtrar as partidas:", error);
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
    <div className="container">
      <h1>Buscar Partidas</h1>
      <form onSubmit={handleFilter} className="filter-form">
        <input 
          type="date" 
          value={data} 
          onChange={(e) => setData(e.target.value)} 
          placeholder="Data" 
        />
        <input 
          type="text" 
          value={local} 
          onChange={(e) => setLocal(e.target.value)} 
          placeholder="Local" 
        />
        <input 
          type="text" 
          value={tipoEsporte} 
          onChange={(e) => setTipoEsporte(e.target.value)} 
          placeholder="Tipo de Esporte" 
        />
        <button type="submit" className="btn-filter">Filtrar</button>
      </form>
      <div className="partidas-list">
        {partidas.length > 0 ? (
          partidas.map((partida) => (
            <div key={partida.id} className="partida-item">
              <h2>{partida.nome}</h2>
              <p>{partida.data}</p>
              <p>{partida.local}</p>
              <p>{partida.tipoEsporte}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma partida encontrada.</p>
        )}
      </div>
      </div>
    </div>
  );
}

export default Partidas;

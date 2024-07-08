import React, { useState } from 'react';
import axios from 'axios';
import '../styles/cadastroPartida.css';
import { Link } from 'react-router-dom';

function CadastroPartida() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [tipoEsporte, setTipoEsporte] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaPartida = { nome, data, local, tipoEsporte, latitude, longitude };
    axios.post('/api/partidas', novaPartida)
      .then(response => {
        alert('Partida cadastrada com sucesso!');
      })
      .catch(error => {
        console.error("Houve um erro ao cadastrar a partida:", error);
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
      <Link to="/contato" className="link-rota">Contato</Link></div>
      <div className="container">
      <h1>Cadastrar Partida</h1>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          placeholder="Data" 
          value={data} 
          onChange={(e) => setData(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Local" 
          value={local} 
          onChange={(e) => setLocal(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Tipo de Esporte" 
          value={tipoEsporte} 
          onChange={(e) => setTipoEsporte(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Latitude" 
          value={latitude} 
          onChange={(e) => setLatitude(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Longitude" 
          value={longitude} 
          onChange={(e) => setLongitude(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-cadastrar">Cadastrar</button>
      </form>
    </div>
    </div>
    
  );
}

export default CadastroPartida;

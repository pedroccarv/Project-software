import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/pagamento.css';



function Pagamento() {
  const [nome, setNome] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const pagamentoInfo = { nome, numeroCartao, validade, cvv };
    axios.post('/api/pagamento  ', pagamentoInfo)
      .then(response => {
        alert('Pagamento realizado com sucesso!');
      })
      .catch(error => {
        console.error("Houve um erro ao processar o pagamento:", error);
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
      <h1>Pagamento</h1>
      <form onSubmit={handleSubmit} className="pagamento-form">
        <input 
          type="text" 
          placeholder="Nome no cartão" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Número do cartão" 
          value={numeroCartao} 
          onChange={(e) => setNumeroCartao(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Validade (MM/AA)" 
          value={validade} 
          onChange={(e) => setValidade(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="CVV" 
          value={cvv} 
          onChange={(e) => setCvv(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-pagar">Pagar</button>
      </form>
    </div>
    </div>

  );
}

export default Pagamento;
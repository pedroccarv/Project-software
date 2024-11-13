import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import NavBar from './NavBar';

function CourtsList() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    // Busca todas as quadras ao carregar a página
    const fetchCourts = async () => {
      try {
        const response = await api.get('/quadras');
        setCourts(response.data);
      } catch (error) {
        console.error('Erro ao buscar quadras:', error);
      }
    };

    fetchCourts();
  }, []);

  return (
    <>
    <NavBar />
        <div className="courts-list">
      <h1>Quadras Disponíveis</h1>
      <div className="courts-container">
        {courts.map((court) => (
          <div key={court.id} className="court-card">
            <h2>{court.name}</h2>
            <p>Local: {court.location}</p>
            <Link to={`/quadra/${court.id}`}>Ver Detalhes e Agendar</Link>
          </div>
        ))}
      </div>
    </div>
    </>

  );
}

export default CourtsList;

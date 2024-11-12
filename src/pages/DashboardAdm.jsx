import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardAdm = () => {
  const [courts, setCourts] = useState([]);
  const [courtName, setCourtName] = useState('');
  const [courtTime, setCourtTime] = useState('');

  // Carregar as quadras existentes
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await axios.get('/admin/courts');
        setCourts(response.data);
      } catch (error) {
        console.error('Erro ao carregar quadras', error);
      }
    };
    fetchCourts();
  }, []);

  const handleCreateCourt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/courts', { courtName, courtTime });
      setCourts([...courts, response.data]); // Adiciona a nova quadra à lista
      setCourtName('');
      setCourtTime('');
    } catch (error) {
      console.error('Erro ao criar quadra', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Painel de Administração</h2>

      <h3>Criar Nova Quadra</h3>
      <form onSubmit={handleCreateCourt}>
        <div>
          <label htmlFor="courtName">Nome da Quadra:</label>
          <input
            type="text"
            id="courtName"
            value={courtName}
            onChange={(e) => setCourtName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="courtTime">Horário:</label>
          <input
            type="time"
            id="courtTime"
            value={courtTime}
            onChange={(e) => setCourtTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Quadra</button>
      </form>

      <h3>Quadras Criadas</h3>
      <ul>
        {courts.map((court) => (
          <li key={court.id}>
            {court.name} - {court.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardAdm;

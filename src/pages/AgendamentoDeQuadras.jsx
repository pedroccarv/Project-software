import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgendamentoDeQuadras = () => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await axios.get('/courts');
        setCourts(response.data);
      } catch (error) {
        console.error('Erro ao carregar quadras', error);
      }
    };
    fetchCourts();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/bookings', { courtId: selectedCourt, date: selectedDate, time: selectedTime });
      alert('Agendamento realizado com sucesso!');
    } catch (error) {
      setErrorMessage('Erro ao agendar. Tente novamente.');
    }
  };

  return (
    <div className="booking-container">
      <h2>Agendar Quadra</h2>
      <form onSubmit={handleBooking}>
        <div>
          <label htmlFor="court">Escolha a Quadra:</label>
          <select
            id="court"
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e.target.value)}
            required
          >
            <option value="">Selecione a Quadra</option>
            {courts.map((court) => (
              <option key={court.id} value={court.id}>
                {court.name} - {court.time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Data:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Hora:</label>
          <input
            type="time"
            id="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agendar</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default AgendamentoDeQuadras;

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import api from '../services/api';
import NavBar from './NavBar';
import { useAuth } from '../services/AuthContext';

function CourtsList() {
  const { user } = useAuth();
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Busca todas as quadras ao carregar a página
    const fetchCourts = async () => {
      try {
        const response = await api.get('/quadras');
        if (response.data && Array.isArray(response.data)) {
          setCourts(response.data);
        } else {
          setCourts([]);
        }
      } catch (error) {
        console.error('Erro ao buscar quadras:', error);
        setCourts([]);
      }
    };

    fetchCourts();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableTimes([]);
    setSelectedTime('');

    // Filtra os horários disponíveis para a data selecionada
    if (selectedCourt && date) {
      const court = courts.find((court) => court.id === selectedCourt);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const times = court.horarios.filter((horario) => horario.diaSemana.toLowerCase() === dayOfWeek);
      setAvailableTimes(times);
    }
  };

  const handleSchedule = async (courtId) => {
    if (!selectedDate || !selectedTime) {
      setErrorMessage('Por favor, selecione a data e o horário.');
      return;
    }

    try {
      const [startTime, endTime] = selectedTime.split('-');
      await api.post('/schedule', {
        userId: user.id, // Usa o ID do usuário autenticado
        courtId,
        dayOfWeek: selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(),
        startTime: startTime.trim(),
        endTime: endTime.trim(),
      });
      setSuccessMessage('Quadra agendada com sucesso!');
      setErrorMessage('');
    } catch (error) {
      console.error('Erro ao agendar quadra:', error);
      setErrorMessage('Erro ao agendar quadra. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="courts-list">
        <h1>Quadras Disponíveis</h1>
        <div className="courts-container">
          {courts.length > 0 ? (
            courts.map((court) => (
              <div key={court.id} className="court-card">
                <h2>{court.name}</h2>
                <p>Local: {court.location}</p>
                <h3>Selecionar Data</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedCourt(court.id);
                    handleDateChange(date);
                  }}
                  minDate={new Date()} // Desabilita datas passadas
                  dateFormat="dd/MM/yyyy"
                />
                {availableTimes.length > 0 && (
                  <>
                    <h3>Horários Disponíveis</h3>
                    <div className="time-options">
                      {availableTimes.map((horario) => (
                        <button
                          key={horario.id}
                          onClick={() => setSelectedTime(`${horario.horarioInicio} - ${horario.horarioFim}`)}
                          className={
                            selectedTime === `${horario.horarioInicio} - ${horario.horarioFim}`
                              ? 'selected'
                              : ''
                          }
                        >
                          {horario.horarioInicio}:00 - {horario.horarioFim}:00
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <button onClick={() => handleSchedule(court.id)}>
                  Agendar Horário
                </button>
                {selectedCourt === court.id && successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}
                {selectedCourt === court.id && errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
            ))
          ) : (
            <p>Nenhuma quadra disponível no momento.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CourtsList;

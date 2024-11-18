import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import NavBar from './NavBar';

function CourtsList() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [expandedDays, setExpandedDays] = useState({}); // Controle de visibilidade dos horários por dia
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Busca todas as quadras ao carregar a página
    const fetchCourts = async () => {
      try {
        const response = await api.get('/quadras');
        console.log('Quadras recebidas:', response.data); // Verifique os dados recebidos

        if (response.data && Array.isArray(response.data)) {
          setCourts(response.data);
        } else {
          setCourts([]);
        }
      } catch (error) {
        console.error('Erro ao buscar quadras:', error);
        setCourts([]); // Em caso de erro, definimos a lista como vazia
      }
    };

    fetchCourts();
  }, []);

  // Função para agrupar horários por dia da semana
  const groupHorariosByDay = (horarios) => {
    const grouped = horarios.reduce((acc, horario) => {
      if (!acc[horario.diaSemana]) {
        acc[horario.diaSemana] = [];
      }
      acc[horario.diaSemana].push(horario);
      return acc;
    }, {});
    return grouped;
  };

  const handleSchedule = async (courtId) => {
    if (!selectedDay || !selectedTime) {
      setErrorMessage('Por favor, selecione o dia e o horário.');
      return;
    }

    try {
      const [startTime, endTime] = selectedTime.split('-');
      await api.post('/schedule', {
        userId: 1, // substituir pelo ID do usuário autenticado
        courtId,
        dayOfWeek: selectedDay,
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

  const toggleDayExpansion = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <>
      <NavBar />
      <div className="courts-list">
        <h1>Quadras Disponíveis</h1>
        <div className="courts-container">
          {courts.length > 0 ? (
            courts.map((court) => {
              const groupedHorarios = groupHorariosByDay(court.horarios);
              return (
                <div key={court.id} className="court-card">
                  <h2>{court.name}</h2>
                  <p>Local: {court.location}</p>
                  <h3>Horários Disponíveis</h3>
                  <div className="schedule-options">
                    {Object.entries(groupedHorarios).map(([day, horarios]) => (
                      <div key={day} className="day-slot">
                        <button
                          className="day-toggle"
                          onClick={() => toggleDayExpansion(day)}
                        >
                          {expandedDays[day] ? '▼' : '►'} {day}
                        </button>
                        {expandedDays[day] && (
                          <div className="time-options">
                            {horarios.map((horario) => (
                              <button
                                key={horario.id}
                                onClick={() => {
                                  setSelectedCourt(court.id);
                                  setSelectedDay(horario.diaSemana);
                                  setSelectedTime(`${horario.horarioInicio} - ${horario.horarioFim}`);
                                }}
                                className={
                                  selectedCourt === court.id &&
                                  selectedDay === horario.diaSemana &&
                                  selectedTime === `${horario.horarioInicio} - ${horario.horarioFim}`
                                    ? 'selected'
                                    : ''
                                }
                              >
                                {horario.horarioInicio}:00 - {horario.horarioFim}:00
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
              );
            })
          ) : (
            <p>Nenhuma quadra disponível no momento.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CourtsList;

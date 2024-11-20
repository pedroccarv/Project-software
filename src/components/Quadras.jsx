import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../services/api';
import NavBar from './NavBar';
import { useAuth } from '../services/AuthContext';

function CourtsList() {
  const { user } = useAuth();
  const [courts, setCourts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data atual já selecionada
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCourt, setSelectedCourt] = useState(null);

  const daysMap = {
    'DOMINGO': 'DOMINGO',
    'SEGUNDA-FEIRA': 'SEGUNDA',
    'TERCA-FEIRA': 'TERCA',
    'QUARTA-FEIRA': 'QUARTA',
    'QUINTA-FEIRA': 'QUINTA',
    'SEXTA-FEIRA': 'SEXTA',
    'SABADO': 'SABADO',
  };

  useEffect(() => {
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

  useEffect(() => {
    if (selectedCourt && selectedDate) {
      const dayOfWeek = selectedDate
        .toLocaleDateString('pt-BR', { weekday: 'long' })
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Remove acentos

      console.log('Dia da semana retornado pelo sistema:', dayOfWeek); // Para depuração
      const enumDay = daysMap[dayOfWeek];
      if (enumDay) {
        const times = selectedCourt.horarios.filter(
          (horario) => horario.diaSemana === enumDay
        );
        setAvailableTimes(times);
      } else {
        console.error(`Dia da semana "${dayOfWeek}" não encontrado no mapeamento.`);
        setAvailableTimes([]);
      }
    }
  }, [selectedCourt, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableTimes([]);
    setSelectedTime('');
  };

  // Função corrigida
  const handleSelectCourt = (court) => {
    setSelectedCourt(court);
    setSelectedDate(new Date()); // Define a data atual ao selecionar uma nova quadra
    setAvailableTimes([]);
    setSelectedTime('');
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !selectedCourt) {
      setErrorMessage('Por favor, selecione a quadra, data e horário.');
      return;
    }
  
    try {
      const [startTime, endTime] = selectedTime.split('-');
      const dayOfWeek = selectedDate
        .toLocaleDateString('pt-BR', { weekday: 'long' })
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Remove acentos
      
      // Converte o dia para o valor correto do enum
      const enumDay = daysMap[dayOfWeek];
      if (!enumDay) {
        setErrorMessage('Dia da semana inválido.');
        return;
      }
  
      await api.post('/schedule', {
        userId: user.id,
        courtId: selectedCourt.id,
        dayOfWeek: enumDay,  // Agora usamos o valor mapeado
        startTime: startTime.trim(),
        endTime: endTime.trim(),
      });
  
      setSuccessMessage('Quadra agendada com sucesso!');
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 5000); // Oculta a mensagem após 5 segundos
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
                <button onClick={() => handleSelectCourt(court)}>
                  Selecionar Quadra
                </button>

                {selectedCourt?.id === court.id && (
                  <>
                    <h3>Selecionar Data</h3>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => handleDateChange(date)}
                      minDate={new Date()} // Desabilita datas passadas
                      dateFormat="dd/MM/yyyy"
                    />
                    {availableTimes.length > 0 ? (
                      <>
                        <h3>Horários Disponíveis</h3>
                        <div className="time-options">
                          {availableTimes.map((horario) => (
                            <button
                              key={horario.id}
                              onClick={() =>
                                setSelectedTime(
                                  `${horario.horarioInicio} - ${horario.horarioFim}`
                                )
                              }
                              className={
                                selectedTime ===
                                `${horario.horarioInicio} - ${horario.horarioFim}`
                                  ? 'selected'
                                  : ''
                              }
                            >
                              {horario.horarioInicio} - {horario.horarioFim}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p>Não há horários disponíveis para o dia selecionado.</p>
                    )}
                    <button
                      onClick={handleSchedule}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Agendar Horário
                    </button>
                    {successMessage && (
                      <p className="success-message">{successMessage}</p>
                    )}
                    {errorMessage && (
                      <p className="error-message">{errorMessage}</p>
                    )}
                  </>
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

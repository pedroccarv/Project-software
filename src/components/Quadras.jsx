import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../services/api';
import NavBar from './NavBar';
import { useAuth } from '../services/AuthContext';

function CourtsList() {
  const { user } = useAuth();
  const [courts, setCourts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    'SABADO': 'SABADO'
  };

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await api.get('/quadras');
        console.log('Resposta da API:', response.data); // Verificando dados retornados
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
        .replace(/[̀-ͯ]/g, ''); // Normaliza o nome do dia
  
      console.log('Data selecionada:', selectedDate);
      console.log('Dia da semana:', dayOfWeek);
  
      const enumDay = daysMap[dayOfWeek];
      console.log('Enum do dia da semana:', enumDay);
  
      if (enumDay) {
        // Função getAvailableHours
        const getAvailableHours = (openingTime, closingTime, selectedDay, diasSemana) => {
          if (!diasSemana.includes(selectedDay)) {
            return []; // Se não estiver no array de dias disponíveis, retorna uma lista vazia
          }
  
          const openingHour = parseInt(openingTime.split(':')[0], 10);
          const closingHour = parseInt(closingTime.split(':')[0], 10);
          const availableHours = [];
          
          for (let hour = openingHour; hour < closingHour; hour++) {
            availableHours.push(`${hour}:00`);
          }
          
          return availableHours;
        };
  
        // Calcula os horários disponíveis para a quadra selecionada
        const availableTimesForSelectedDay = getAvailableHours(
          selectedCourt.openingTime,
          selectedCourt.closingTime,
          enumDay,
          selectedCourt.diasSemana
        );
  
        console.log('Horários disponíveis para o dia selecionado:', availableTimesForSelectedDay);
        setAvailableTimes(availableTimesForSelectedDay);
      } else {
        console.warn('Dia da semana inválido:', dayOfWeek);
        setAvailableTimes([]); // Se o dia não for válido, limpa os horários
      }
    }
  }, [selectedCourt, selectedDate]); // Depende de selectedCourt e selectedDate

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableTimes([]);
    setSelectedTime('');
  };

  const handleSelectCourt = (court) => {
    console.log('Quadra selecionada:', court); // Debug para verificar quadra selecionada
    setSelectedCourt(court);
    setSelectedDate(new Date());
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
        .replace(/[̀-ͯ]/g, ''); // Normaliza o nome do dia
  
      const enumDay = daysMap[dayOfWeek];
      if (!enumDay) {
        setErrorMessage('Dia da semana inválido.');
        return;
      }
  
      // Formatar a data para envio no formato ISO
      const formattedDate = selectedDate.toISOString();  // Aqui garantimos que a data seja uma string ISO
  
      console.log('Agendamento:', {
        userId: user.id,
        courtId: selectedCourt.id,
        courtNumber: selectedCourt.numCourts,
        dayOfWeek: enumDay,
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        date: formattedDate,  // Passando a data formatada
      });
  
      await api.post('/schedule', {
        userId: user.id,
        courtId: selectedCourt.id,
        courtNumber: selectedCourt.numCourts,
        dayOfWeek: enumDay,
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        date: formattedDate,  // Enviando a data correta
      });
  
      setSuccessMessage('Quadra agendada com sucesso!');
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Erro ao agendar quadra:', error);
      setErrorMessage('Erro ao agendar quadra. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Quadras Disponíveis</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.length > 0 ? (
            courts.map((court) => (
              <div
                key={court.id}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold">{court.name}</h2>
                <p className="text-gray-600">Local: {court.location}</p>
                <button
                  onClick={() => handleSelectCourt(court)}
                  className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                  Selecionar Quadra
                </button>

                {selectedCourt?.id === court.id && (
                  <div className="mt-4">
                    <h3 className="font-bold">Selecionar Data</h3>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => handleDateChange(date)}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      className="mt-2 border rounded w-full p-2"
                    />
                    {availableTimes.length > 0 ? (
  <div className="mt-4">
    <h3 className="font-bold">Horários Disponíveis</h3>
    <div className="flex flex-wrap gap-2">
      {availableTimes.map((horario, index) => (
        <button
          key={index}
          onClick={() =>
            setSelectedTime(`${horario} - ${parseInt(horario.split(':')[0], 10) + 1}:00`)
          }
          className={`py-1 px-2 border rounded ${
            selectedTime === `${horario} - ${parseInt(horario.split(':')[0], 10) + 1}:00`
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100'
          }`}
        >
          {horario} - {parseInt(horario.split(':')[0], 10) + 1}:00
        </button>
      ))}
    </div>
  </div>
) : (
  <p className="text-red-500 mt-2">
    {selectedCourt && selectedDate
      ? 'Não há horários disponíveis para o dia selecionado.'
      : 'Selecione uma quadra e uma data para ver os horários disponíveis.'}
  </p>
)}
                    <button
                      onClick={handleSchedule}
                      disabled={!selectedDate || !selectedTime}
                      className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
                    >
                      Agendar Horário
                    </button>
                    {successMessage && (
                      <p className="text-green-500 mt-2">{successMessage}</p>
                    )}
                    {errorMessage && (
                      <p className="text-red-500 mt-2">{errorMessage}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma quadra disponível no momento.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CourtsList;

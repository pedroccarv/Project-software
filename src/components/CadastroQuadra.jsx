import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importa a configuração do axios
import NavBar from './NavBar';

function AdminCreateCourt() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [numCourts, setNumCourts] = useState(1); // Novo estado para o número de quadras
  const diasSemanaOptions = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
  const navigate = useNavigate();

  const handleDaySelection = (day) => {
    if (diasSemana.includes(day)) {
      setDiasSemana(diasSemana.filter((d) => d !== day));
    } else {
      setDiasSemana([...diasSemana, day]);
    }
  };

  const handlePhotoChange = (e) => {
    setPhotos([e.target.value]); // Define photos como um array com a URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem('userId'); // Verifica se o ID do usuário está no localStorage
    if (!userId) {
      alert('Usuário não autenticado. Faça login novamente.');
      navigate('/login');
      return;
    }
  
    if (!name || !location || photos.length === 0 || diasSemana.length === 0 || !openingTime || !closingTime || numCourts < 1) {
      alert('Todos os campos são obrigatórios e o número de quadras deve ser maior que zero.');
      return;
    }
  
    // Garantir que numCourts é um número
    const numCourtsInt = parseInt(numCourts, 10);
  
    // Verificar os dados antes de enviar
    console.log('Dados enviados:', {
      userId,
      name,
      location,
      photos,
      availableDays: diasSemana,
      openingTime,
      closingTime,
      numCourts: numCourtsInt, // Enviar como número
    });
  
    try {
      await api.post('/admin/cadastro-quadra', {
        userId,
        name,
        location,
        photos,
        availableDays: diasSemana,
        openingTime,
        closingTime,
        numCourts: numCourtsInt
      });      
      alert('Quadra criada com sucesso!');
      setName('');
      setLocation('');
      setPhotos([]);
      setDiasSemana([]);
      setOpeningTime('');
      setClosingTime('');
      setNumCourts(1);
    } catch (error) {
      console.error('Erro ao criar quadra:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Erro ao criar quadra: ${error.response.data.error}`);
      } else {
        alert('Erro ao criar quadra. Verifique os dados e tente novamente.');
      }
    }
  };
  return (
    <>
      <NavBar />
      <div className="admin-create-court">
        <h2>Cadastrar Nova Quadra</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome da Quadra:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Localização da Quadra:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>URL da Imagem:</label>
            <input
              type="text"
              onChange={(e) => handlePhotoChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label>Dias da Semana Disponíveis:</label>
            <div className="dias-semana-options">
              {diasSemanaOptions.map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    checked={diasSemana.includes(day)}
                    onChange={() => handleDaySelection(day)}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Horário de Abertura:</label>
            <input
              type="time"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Horário de Fechamento:</label>
            <input
              type="time"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Número de Quadras:</label>
            <input
              type="number"
              min="1"
              value={numCourts}
              onChange={(e) => setNumCourts(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cadastrar Quadra</button>
        </form>
      </div>
    </>
  );
}

export default AdminCreateCourt;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgendamentoDoUsuario  = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/user/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Erro ao carregar agendamentos', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      <h2>Meus Agendamentos</h2>
      <table>
        <thead>
          <tr>
            <th>Quadra</th>
            <th>Data</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.courtName}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgendamentoDoUsuario;

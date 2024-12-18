import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/AuthContext'; // Supondo que você tenha o AuthContext configurado para obter o userId
import api from '../services/api'; // Supondo que você tenha um arquivo api.js para configurar suas requisições
import NavBar from './NavBar';

function AppointmentsPage() {
    const { user } = useAuth(); // Obtém o usuário autenticado
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch agendamentos ao carregar a página
        const fetchAppointments = async () => {
            if (!user?.id) {
                setError('Usuário não autenticado');
                return;
            }

            try {
                const response = await api.get(`/appointments?userId=${user.id}`);
                setAppointments(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
                setError('Erro ao carregar agendamentos');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [user]);

    // Função para excluir um agendamento
    const handleDelete = async (appointmentId) => {
        try {
            const appointmentIdString = String(appointmentId);  // Garantir que seja uma string
            await api.delete(`/appointments/${appointmentIdString}`);
            // Remove o agendamento excluído da lista localmente
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.id !== appointmentIdString)
            );
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
            setError('Erro ao excluir agendamento');
        }
    };    
    if (loading) {
        return <div>Carregando agendamentos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <>
        <NavBar />
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Meus Agendamentos</h1>
            {appointments.length === 0 ? (
                <p className="text-gray-500">Você ainda não tem agendamentos.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg"
                        >
                            <h2 className="text-xl font-semibold">{appointment.quadra.name}</h2>
                            <p className="text-gray-600">Local: {appointment.quadra.location}</p>
                            {/* Exibindo a data formatada corretamente */}
                            <p className="text-gray-600">
                                Data: {new Date(appointment.date).toLocaleDateString('pt-BR')}
                            </p>
                            <p className="text-gray-600">
                                Horário: {appointment.horarioInicio}hr - {appointment.horarioFim}hr
                            </p>
                            {/* Botão de excluir */}
                            <button
                                onClick={() => handleDelete(appointment.id)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Excluir
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
}

export default AppointmentsPage;

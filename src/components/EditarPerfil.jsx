import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/editarPerfil.css';

function EditarPerfil() {
  const { user, login } = useAuth();
  const [nome, setNome] = useState(user?.name || '');
  const [idade, setIdade] = useState(user?.age || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNome(user.name);
      setIdade(user.age);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put(`/usuarios/${user.id}`, {
        name: nome,
        age: idade,
        email: email,
      });

      login(response.data); // Atualiza o contexto com os novos dados do usuário
      alert('Perfil atualizado com sucesso!');
      navigate('/'); // Redireciona para a página inicial ou outra de sua preferência
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen bg-white text-[#161931]">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Editar Perfil</h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-900">
                Nome
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite seu nome"
                  aria-label="Nome"
                />
              </div>
            </div>

            <div>
              <label htmlFor="idade" className="block text-sm font-medium text-gray-900">
                Idade
              </label>
              <div className="mt-2">
                <input
                  id="idade"
                  name="idade"
                  type="number"
                  required
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite sua idade"
                  aria-label="Idade"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                E-mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite seu e-mail"
                  aria-label="E-mail"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarPerfil;

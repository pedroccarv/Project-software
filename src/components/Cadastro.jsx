import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/cadastro.css';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [age, setAge] = useState('');

  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const inputEmail = useRef()
  const inputAge = useRef()
  const inputNome = useRef()
  const inputPassword = useRef()
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  async function createUsers() {
    try {
      await api.post('/usuarios', {
        name: nome,
        age: age,
        email: email,
        password: password,
        isAdmin: isAdmin  // Certifique-se de que está enviando "password"
      });
      alert("Usuário criado com sucesso!");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("Erro ao criar usuário");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== verifyEmail) {
      alert("Os e-mails não coincidem!");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <a href="/">
            <img src="/src/assets/logo.png" alt="Logo" className="h-16 w-auto" />
          </a>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-4">Crie uma conta</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Nome"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-200 focus:ring-yellow-200 sm:text-sm"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              ref={inputNome}
              required
            />
          </div>
          {/* Idade */}
          <div>
            <label htmlFor="idade" className="block text-sm font-medium text-gray-700">
              Idade
            </label>
            <input
              id="idade"
              name="idade"
              type="number"
              placeholder="Idade"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-200 focus:ring-yellow-200 sm:text-sm"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              ref={inputAge}
              required
            />
          </div>
          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-200 focus:ring-yellow-200 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={inputEmail}
              required
            />
          </div>
          {/* Verificar E-mail */}
          {/* Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type={senhaVisivel ? "text" : "password"}
              placeholder="Senha"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-200 focus:ring-yellow-200 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={inputPassword}
              required
            />
          </div>
          {/* Checkbox Administrador */}
          <div className="flex items-center">
            <input
              id="isAdmin"
              name="isAdmin"
              type="checkbox"
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-400 border-gray-300 rounded"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
              Desejo me cadastrar como administrador
            </label>
          </div>
          {/* Botão de Cadastro */}
          <div>
            <button
              type="submit"
              onClick={createUsers}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              Criar perfil gratuito
            </button>
          </div>
        </form>
        {/* Links e Termos */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Ao se registrar, você está de acordo com nossos{" "}
          <a href="#" className="font-medium text-yellow-400 hover:text-yellow-400">
            termos e condições
          </a>{" "}
          e confirma estar ciente de nossa{" "}
          <a href="#" className="font-medium text-yellow-400 hover:text-yellow-400">
            política de privacidade
          </a>.
        </p>
        <p className="mt-4 text-center text-sm text-gray-500">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-medium text-yellow-400 hover:text-yellow-400"
          >
            Faça seu login!
          </Link>
        </p>
      </div>
    </div>

  );
}

export default Cadastro;
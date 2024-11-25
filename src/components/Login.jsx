import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';
import { Toaster, toast } from 'sonner';
import Logo from "../assets/logo.png"

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleLembrarChange = (event) => {
    setLembrar(event.target.checked);
  };

  const handleEntrarClick = async (e) => {
    e.preventDefault();
    if (email && senha) {
      try {
        const response = await api.post('/login', { email, password: senha });
        if (response && response.data) {
          localStorage.setItem('userId', response.data.id);
          login(response.data);
          toast.success('Login realizado com sucesso!');
          navigate('/');
        } else {
          throw new Error('Resposta inválida da API');
        }
      } catch (error) {
        toast.error('Erro ao fazer login: ' + (error.response?.data?.error || error.message));
      }
    } else {
      toast.error('Preencha os campos de email e senha');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              alt="Sua Empresa"
              src={Logo}
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Faça login na sua conta
            </h2>
          </div>
          <form onSubmit={handleEntrarClick} className="space-y-6">
            {/* Campo de Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Endereço de Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                  placeholder="Digite seu email"
                  aria-label="Endereço de Email"
                />
              </div>
            </div>
            {/* Campo de Senha */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={senha}
                  onChange={handleSenhaChange}
                  className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                  placeholder="Digite sua senha"
                  aria-label="Senha"
                />
              </div>
            </div>
            {/* Checkbox Lembre-me */}
            <div className="flex items-center">
              <input
                id="lembrar"
                name="lembrar"
                type="checkbox"
                checked={lembrar}
                onChange={handleLembrarChange}
                className="h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="lembrar" className="ml-2 block text-sm text-gray-900">
                Lembre-me
              </label>
            </div>
            {/* Botão de Login */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-500 p-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                Entrar
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="font-semibold text-orange-500 hover:text-orange-400"
            >
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </>

  );
}

export default Login;

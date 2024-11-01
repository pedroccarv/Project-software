import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';
import { Toaster, toast } from 'sonner';

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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Faça login na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleEntrarClick} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite seu email"
                  aria-label="Endereço de Email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Senha
                </label>
                <div className="text-sm">
                  <Link to="/recuperar-senha" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Esqueceu a senha?
                  </Link>
                </div>
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite sua senha"
                  aria-label="Senha"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="lembrar"
                name="lembrar"
                type="checkbox"
                checked={lembrar}
                onChange={handleLembrarChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="lembrar" className="ml-2 block text-sm text-gray-900">
                Lembre-me
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="mt-6">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
                toast.success('Login com Google realizado com sucesso!');
              }}
              onError={() => {
                console.log('Login Failed');
                toast.error('Erro ao realizar login com Google');
              }}
            />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

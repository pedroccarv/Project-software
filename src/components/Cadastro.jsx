import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/cadastro.css';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'sonner'

function Cadastro() {
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
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
    <div className="cadastro-page">
      {/* Botão de Menu totalmente à esquerda */}
      
      {/* Contêiner de Cadastro centralizado */}
      <div className="cadastro-container">
        <a href="/"><img src="/src/assets/logo.png" alt="Logo" width="60%" /></a>
        <h1>Crie uma conta</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            ref={inputNome}
            required
          />
          <input
            type="number"
            placeholder="Idade"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            ref={inputAge}
            required
          />
          <input 
            type="email" 
            placeholder="E-mail"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={inputEmail}
            required 
          />
          <input 
            type="email" 
            placeholder="Verifique seu e-mail"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={verifyEmail}
            onChange={(e) => setVerifyEmail(e.target.value)}
            required
          />
          <div className="senha-container">
            <input 
              type={senhaVisivel ? "text" : "password"} 
              placeholder="Senha"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={inputPassword}
              required
            />
            {/* <span className="eye-icon absolute right-0" onClick={toggleSenhaVisivel}> */}
              <FontAwesomeIcon onClick={toggleSenhaVisivel} className='absolute right-3 bottom-8' icon={senhaVisivel ? faEye : faEyeSlash} />
            {/* </span> */}
          </div>
          <div className="admin-checkbox">
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Desejo me cadastrar como administrador
            </label>
          </div>
          <button type="submit" onClick={createUsers} className="btn-cadastrar">Criar perfil gratuito</button>
        </form>
        <p className="terms">
          Ao se registrar, você está de acordo com nossos <a href="#">termos e condições</a> e confirma estar ciente de nossa <a href="#">política de privacidade</a>.
        </p>
        <p className="login">
          Já tem uma conta? <Link to="/login">Faça seu login!</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
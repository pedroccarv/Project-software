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
  const [menuAberto, setMenuAberto] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const menuRef = useRef(null); // Para referenciar o menu
  const inputEmail = useRef()
  const inputAge = useRef()
  const inputNome = useRef()
  const inputPassword = useRef()
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const closeMenu = () => {
    setMenuAberto(false);
  };

  // Função para fechar o menu se clicar fora
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    // Adiciona e remove o evento de clique
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  async function createUsers() {
    try {
      await api.post('/usuarios', {
        name: nome,
        age: age,
        email: email,
        password: password,  // Certifique-se de que está enviando "password"
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
      <button className="menu-button" onClick={toggleMenu}>
        Menu
      </button>

      {/* Menu Lateral */}
      {menuAberto && (
        <div className="menu" ref={menuRef}>
          <Link to="/login" onClick={closeMenu}>Login</Link>
          <Link to="/cadastro" onClick={closeMenu}>Cadastro</Link>
          <Link to="/editar-perfil" onClick={closeMenu}>Editar Perfil</Link>
          <Link to="/mapa" onClick={closeMenu}>Mapa</Link>
          <Link to="/favoritar-partida" onClick={closeMenu}>Partidas Favoritas</Link>
          <Link to="/detalhes-partida" onClick={closeMenu}>Detalhes Partidas</Link>
          <Link to="/cadastro-partida" onClick={closeMenu}>Cadastro Partidas</Link>
          <Link to="/historico-partidas" onClick={closeMenu}>Histórico Partidas</Link>
          <Link to="/pagamento" onClick={closeMenu}>Pagamento</Link>
          <Link to="/contato" onClick={closeMenu}>Contato</Link>
          <Link to="/historico-conquistas" onClick={closeMenu}>Histórico de Conquistas</Link>
          <Link to="/notificacoes" onClick={closeMenu}>Notificações</Link>
          <Link to="/chat" onClick={closeMenu}>Chat</Link>
          <Link to="/upload-imagem" onClick={closeMenu}>Imagem</Link>
          <Link to="/avaliacao-partida" onClick={closeMenu}>Avaliação Partida</Link>
          <Link to="/convidar-amigos" onClick={closeMenu}>Convidar Amigos</Link>
        </div>
      )}

      {/* Contêiner de Cadastro centralizado */}
      <div className="cadastro-container">
        <img src="/src/assets/logo.png" alt="Logo" width="60%" />
        <h1>Crie uma conta</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            ref={inputNome}
            required
          />
          <input
            type="number"
            placeholder="Idade"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            ref={inputAge}
            required
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={inputEmail}
            required 
          />
          <input 
            type="email" 
            placeholder="Verifique seu e-mail" 
            value={verifyEmail}
            onChange={(e) => setVerifyEmail(e.target.value)}
            required
          />
          <div className="senha-container">
            <input 
              type={senhaVisivel ? "text" : "password"} 
              placeholder="Senha"
              className=''
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={inputPassword}
              required
            />
            {/* <span className="eye-icon absolute right-0" onClick={toggleSenhaVisivel}> */}
              <FontAwesomeIcon onClick={toggleSenhaVisivel} className='absolute right-3 bottom-8' icon={senhaVisivel ? faEye : faEyeSlash} />
            {/* </span> */}
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

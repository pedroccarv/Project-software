import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext'; // Importando o contexto de autenticação
import '../styles/LandingPage.css'; // Importe um CSS para estilos
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';

const LandingPage = () => {
  const { user, logout } = useAuth(); // Obtendo informações do usuário logado e a função de logout
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // Estado para controlar o menu suspenso
  const navigate = useNavigate(); // Chama o useNavigate aqui
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        if (Array.isArray(response.data)) { // Verifique se os dados são um array
          setPosts(response.data);
        } else {
          console.error('Dados de postagens inválidos:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar postagens:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      content: postContent,
      image: postImage,
      userId: user.id, // ID do usuário logado
    };

    try {
      const response = await axios.post('http://localhost:3000/posts', newPost);

      // Cria um novo post incluindo os dados do usuário
      const postWithUser = {
        ...response.data,
        user: { id: response.data.user.id, name: response.data.user.name }, // Inclua o nome do usuário
      };

      setPosts([postWithUser, ...posts]); // Adiciona a nova postagem no início
      setPostContent('');
      setPostImage(null);
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`, {
        data: { userId: user.id }, // Envia o userId no corpo da requisição
      });
      setPosts(posts.filter(post => post.id !== postId)); // Atualiza a lista de posts removendo o post excluído
    } catch (error) {
      console.error('Erro ao excluir postagem:', error);
    }
  };

  const handleEditPost = async (postId, updatedContent) => {
    try {
      const response = await axios.put(`http://localhost:3000/posts/${postId}`, {
        content: updatedContent,
        userId: user.id, // Certifique-se de enviar o userId aqui
      });
      setPosts(posts.map((post) => (post.id === postId ? response.data : post)));
    } catch (error) {
      console.error('Erro ao editar postagem:', error);
    }
  };

  // Função para alternar o menu suspenso
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
    <NavBar />
    <div className="landing-page">
      <header className="header">
        <h1>Meu Feed</h1>

        {/* Menu de usuário no canto superior direito */}
        {user && (
          <Menu as="div" className="relative inline-block text-left">
            <div>

              <MenuButton className="flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <span className='flex justify-center items-center'> <img
                  alt=""
                  FontAwesomeIcon icon="fa-solid fa-user" 
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                /></span>
                {user?.name || 'Usuário'}
                <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 14a.997.997 0 01-.707-.293l-5-5a.999.999 0 111.414-1.414L10 11.586l4.293-4.293a.999.999 0 111.414 1.414l-5 5A.997.997 0 0110 14z" fill="#5C5F62" /></svg>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <button onClick={() => navigate('/editar-perfil')}>Editar Perfil</button>
                </MenuItem>
                <MenuItem>
                  <button onClick={logout}>Sair</button>
                </MenuItem>

              </div>
            </MenuItems>
          </Menu>
        )}
      </header>

      {user ? (
        <div className="post-form">
          <form onSubmit={handlePostSubmit}>
            <textarea
              placeholder="O que você está pensando?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPostImage(URL.createObjectURL(e.target.files[0]))}
            />
            <button type="submit">Postar</button>
          </form>
        </div>
      ) : (
        <p>Você precisa estar logado para fazer uma postagem.</p>
      )}

      <div className="posts-feed">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={user}
            onDeletePost={handleDeletePost}
            onEditPost={handleEditPost}
          />
        ))}
      </div>
    </div>
    </>
  );
};

// Componente Post
const Post = ({ post, user, onDeletePost, onEditPost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content || ''); // Inicializa com um valor seguro

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEditPost(post.id, editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(post.content || ''); // Reseta para um valor seguro
    setIsEditing(false);
  };

  // Verifique se post.user está definido
  const userName = post.user?.name || 'Usuário Desconhecido';

  return (
    <>
    <div className="post">
      <p>
        <strong>{userName}</strong> - {new Date(post.createdAt).toLocaleString()}
      </p>

      

      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Salvar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      ) : (
        <p>{post.content}</p>
      )}

      {post.image && <img src={post.image} alt="Post" width="200" />}

      {/* Botões de Editar e Excluir apenas se o usuário for o autor do post */}
      {user && user.id === post.userId && (
        <div className="post-actions">
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={() => onDeletePost(post.id)}>Excluir</button>
        </div>
      )}
    </div>
    </>
  );
};

export default LandingPage;

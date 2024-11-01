import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext'; // Importando o contexto de autenticação
import '../styles/LandingPage.css'; // Importe um CSS para estilos
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const LandingPage = () => {
  const { user, logout } = useAuth(); // Obtendo informações do usuário logado e a função de logout
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
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
      const postWithUser = {
        ...response.data,
        user: { id: response.data.user.id, name: response.data.user.name },
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

  return (
    <>
      <NavBar />
      <div className="landing-page">
        <header className="header">
          <h1>Meu Feed</h1>
        </header>

        {user ? (
          <div className="post-form">
<form onSubmit={handlePostSubmit}>
  <label htmlFor="postContent" className="sr-only">Sua mensagem</label>
  <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
    <label htmlFor="imageUpload" className="cursor-pointer inline-flex justify-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
        <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
      </svg>
      <span className="sr-only">Upload image</span>
    </label>
    <input
      id="imageUpload"
      type="file"
      accept="image/*"
      onChange={(e) => setPostImage(URL.createObjectURL(e.target.files[0]))}
      className="hidden" // Continue a usar hidden, mas envolva com o label
    />
    <textarea
      id="postContent"
      rows="1"
      className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="O que você está pensando?"
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
      required
    />
    <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
      <svg className="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
      </svg>
      <span className="sr-only">Enviar mensagem</span>
    </button>
  </div>
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

  const userName = post.user?.name || 'Usuário Desconhecido';

  return (
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
      {user && user.id === post.userId && (
        <div className="post-actions">
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={() => onDeletePost(post.id)}>Excluir</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

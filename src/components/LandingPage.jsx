import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext'; // Importando o contexto de autenticação
import '../styles/LandingPage.css'; // Importe um CSS para estilos
import axios from 'axios';

const LandingPage = () => {
  const { user } = useAuth(); // Obtendo informações do usuário logado
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);

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
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Meu Feed</h1>
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
  );
};

export default LandingPage;
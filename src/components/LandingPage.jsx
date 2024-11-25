import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import '../styles/LandingPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const LandingPage = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        if (Array.isArray(response.data)) {
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
      userId: user.id,
    };

    try {
      const response = await axios.post('http://localhost:3000/posts', newPost);
      const postWithUser = {
        ...response.data,
        user: { id: response.data.user.id, name: response.data.user.name },
      };

      setPosts([postWithUser, ...posts]);
      setPostContent('');
      setPostImage(null);
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`, {
        data: { userId: user.id },
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Erro ao excluir postagem:', error);
    }
  };

  const handleEditPost = async (postId, updatedContent) => {
    try {
      const response = await axios.put(`http://localhost:3000/posts/${postId}`, {
        content: updatedContent,
        userId: user.id,
      });
      setPosts(posts.map((post) => (post.id === postId ? response.data : post)));
    } catch (error) {
      console.error('Erro ao editar postagem:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        {/* Header */}
        <div className="w-full">
          <header className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-orange-400">Meu Feed</h1>
          </header>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Formulário de Postagem */}
          {user ? (
            <div className="post-form  p-4 rounded-lg shadow-md">
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <label htmlFor="postContent" className="sr-only">
                  Sua mensagem
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="postContent"
                    rows="1"
                    className="flex-1 p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="O que você está pensando?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    required
                  />
                  {/* Botão de enviar */}
                  <button
                    type="submit"
                    className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                  >
                    <svg
                      className="w-6 h-6 rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p className="text-center text-gray-700">Você precisa estar logado para fazer uma postagem.</p>
          )}

          <div className="posts-feed space-y-4">
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
      </div>
    </>
  );
};

const Post = ({ post, user, onDeletePost, onEditPost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content || '');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() !== '') {
      onEditPost(post.id, editedContent);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(post.content || '');
    setIsEditing(false);
  };

  const userName = post.user?.name || 'Usuário Desconhecido';

  return (
    <div className="post  p-4 border rounded-lg shadow-md">
      <p className="font-bold text-orange-800">{userName}</p>
      <p className="text-sm text-gray-600 mb-4">{new Date(post.createdAt).toLocaleString()}</p>
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleSaveEdit}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Salvar
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-700 mb-4">{post.content}</p>
          {post.image && <img src={post.image} alt="Post" className="mb-4 max-w-full rounded-md" />}
          {user && user.id === post.userId && (
            <div className="flex space-x-2">
              <button
                onClick={handleEditClick}
                className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
              >
                Editar
              </button>
              <button
                onClick={() => onDeletePost(post.id)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LandingPage;
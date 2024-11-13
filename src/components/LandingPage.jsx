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
      <div className="landing-page">
        <div className="w-full">
          <header className="header">
            <h1>Meu Feed</h1>
          </header>
          {user ? (
            <div className="post-form">
              <form onSubmit={handlePostSubmit}>
                <label htmlFor="postContent" className="sr-only">
                  Sua mensagem
                </label>
                <div className="flex items-center rounded-lg bg-gray-50 dark:bg-gray-700">
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer inline-flex justify-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        fill="currentColor"
                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    <span className="sr-only">Upload image</span>
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPostImage(URL.createObjectURL(e.target.files[0]))}
                    className="hidden"
                  />
                  <input
                    id="postContent"
                    rows="1"
                    className="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="O que você está pensando?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-5 h-5 rotate-90"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Enviar mensagem</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p>Você precisa estar logado para fazer uma postagem.</p>
          )}
        </div>

        <div className="posts-feed w-full">
          {posts.map((post) => (
            <Post key={post.id} post={post} user={user} onDeletePost={handleDeletePost} onEditPost={handleEditPost} />
          ))}
        </div>
      </div>
    </>
  );
};

// Componente Post
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
    <div className="post p-4 border border-gray-300 rounded-md shadow-sm mb-4 bg-white">
      <p className="font-bold text-gray-800 mb-2">
        {userName} - {new Date(post.createdAt).toLocaleString()}
      </p>
      {isEditing ? (
        <div className="edit-post-form">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none dark:focus:ring-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-900 mb-4">{post.content}</p>
          {post.image && <img src={post.image} alt="Post" width="200" className="mb-4" />}
          {user && user.id === post.userId && (
            <div className="post-actions flex gap-2">
              <button
                type="button"
                onClick={handleEditClick}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDeletePost(post.id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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

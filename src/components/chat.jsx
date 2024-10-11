import { useState, useEffect, useRef } from 'react';
import '../styles/chat.css';
import { Link } from 'react-router-dom';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        // Cria uma nova conexão WebSocket quando o componente é montado
        socketRef.current = new WebSocket('ws://seu-servidor-websocket.com');

        // Escuta as mensagens recebidas do servidor WebSocket
        socketRef.current.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        // Fecha a conexão WebSocket quando o componente é desmontado
        return () => {
            socketRef.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = {
                text: message,
                sender: 'Você',
                timestamp: new Date().toLocaleTimeString(),
            };

            // Envia a mensagem para o servidor WebSocket
            socketRef.current.send(JSON.stringify(newMessage));

            // Atualiza a lista de mensagens no cliente
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // Limpa o campo de entrada
            setMessage('');
        }
    };

    return (
        <div className="app-container">
            {/* Menu dropdown */}
            <div className="menu-container">
                <div className="menu-dropdown">
                    <span className="menu-button">Menu</span>
                    <div className="menu-content">
                        <Link to="/login" className="menu-item">Login</Link>
                        <Link to="/cadastro" className="menu-item">Cadastro</Link>
                        <Link to="/editar-perfil" className="menu-item">Editar Perfil</Link>
                        <Link to="/mapa" className="menu-item">Mapa</Link>
                        <Link to="/favoritar-partida" className="menu-item">Partidas Favoritas</Link>
                        <Link to="/detalhes-partida" className="menu-item">Detalhes Partidas</Link>
                        <Link to="/cadastro-partida" className="menu-item">Cadastro Partidas</Link>
                        <Link to="/historico-partidas" className="menu-item">Histórico Partidas</Link>
                        <Link to="/pagamento" className="menu-item">Pagamento</Link>
                        <Link to="/contato" className="menu-item">Contato</Link>
                        <Link to="/historico-conquistas" className="menu-item">Histórico conquistas</Link>
                        <Link to="/notificacoes" className="menu-item">Notificações</Link>
                        <Link to="/chat" className="menu-item">Chat</Link>
                        <Link to="/upload-imagem" className="menu-item">Imagem</Link>
                        <Link to="/avaliacao-partida" className="menu-item">Avaliação partida</Link>
                        <Link to="/convidar-amigos" className="menu-item">Convidar amigos</Link>
                    </div>
                </div>
            </div>

            {/* Chat centralizado */}
            <div className="chat-container">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === 'Você' ? 'user' : 'bot'}`}>
                            <p><strong>{msg.sender}:</strong> {msg.text}</p>
                            <p className="timestamp">{msg.timestamp}</p>
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                    />
                    <button onClick={sendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;

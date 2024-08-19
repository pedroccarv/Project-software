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
                sender: 'Você', // Pode ser substituído por um ID de usuário real
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
        <div className="rotas">
        <Link to="/login" className="link-rota">Login</Link>
        <Link to="/cadastro" className="link-rota">Cadastro</Link>
        <Link to="/editar-perfil" className="link-rota">Editar Perfil</Link>
        <Link to="/mapa" className="link-rota">Mapa</Link>
        <Link to="/favoritar-partida" className="link-rota">Partidas Favoritas</Link>
        <Link to="/detalhes-partida" className="link-rota">Detalhes Partidas</Link>
        <Link to="/cadastro-partida" className="link-rota">Cadastro Partidas</Link>
        <Link to="/historico-partidas" className="link-rota">Historico Partidas</Link>
        <Link to="/pagamento" className="link-rota">Pagamento</Link>
        <Link to="/contato" className="link-rota">Contato</Link>
        <Link to="/historico-conquistas" className="link-rota">Historico  conquistas</Link>
        <Link to="/notificacoes" className="link-rota">Notificacoes</Link>
        <Link to="/chat" className="link-rota">Chat</Link>
        <Link to="/upload-imagem" className="link-rota">Imagem</Link>
        <Link to="/avaliacao-partida" className="link-rota">Avaliacao partida</Link>
        <Link to="/convidar-amigos" className="link-rota">Convidar amigos</Link>
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <span><strong>{msg.sender}:</strong> {msg.text}</span>
                        <span className="timestamp">{msg.timestamp}</span>
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

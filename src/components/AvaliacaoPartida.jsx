import { useState } from 'react';
import '../styles/AvaliacaoPartida.css';
import { Link } from 'react-router-dom';
function AvaliacaoPartida() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const submitRating = async () => {
        if (rating < 1 || rating > 5) {
            alert('Por favor, escolha uma avaliação válida (entre 1 e 5 estrelas).');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/avaliar-partida', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating }),
            });

            const result = await response.json();

            if (result.success) {
                setFeedback(result.message);
            } else {
                setFeedback(result.message);
            }
        } catch (error) {
            setFeedback('Erro ao conectar ao servidor.');
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
        <div className="avaliacao-partida-container">
            <h2>Avalie a Partida</h2>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <h6
                        key={star}
                        className={star <= rating ? 'star filled' : 'star'}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </h6>
                ))}
            </div>
            <button onClick={submitRating}>Enviar Avaliação</button>
            {feedback && <p>{feedback}</p>}
        </div>
        </div>
    );
}

export default AvaliacaoPartida; 

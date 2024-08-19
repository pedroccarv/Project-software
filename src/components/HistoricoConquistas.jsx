import '../styles/HistoricoConquistas.css';
import { Link } from 'react-router-dom';
function HistoricoConquistas() {
    const conquistas = [
        { id: 1, titulo: 'MVP da Partida', data: '2024-08-10' },
        { id: 2, titulo: 'Partida Ganha', data: '2024-08-05' },
        // Adicione mais conquistas aqui
    ];

    return (
        <div className="historico-conquistas-container">
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
        </div>

            <h2>Histórico de Conquistas</h2>
            <ul>
                {conquistas.map((conquista) => (
                    <li key={conquista.id}>
                        <strong>{conquista.titulo}</strong> - {conquista.data}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HistoricoConquistas;

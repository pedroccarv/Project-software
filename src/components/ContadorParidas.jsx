import React, { useState } from 'react';

function ContadorPartidas() {
    const [partidas, setPartidas] = useState(0);

    const incrementarPartida = () => {
        setPartidas(partidas + 1);
    };

    const resetarContador = () => {
        setPartidas(0);
    };

    return (
        <div className="contador-partidas-container">
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
                <Link to="/contador-partidas" className="link-rota">Contador Partidas</Link>
                <Link to="/imagem" className="link-rota">Imagem</Link>
                

            </div>
            
            <h2>Contador de Partidas</h2>
            <p>Número de partidas jogadas: {partidas}</p>
            <button onClick={incrementarPartida}>Adicionar Partida</button>
            <button onClick={resetarContador}>Resetar Contador</button>
        </div>
        
        
    );
}

export default ContadorPartidas;
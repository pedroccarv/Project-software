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
            <h2>Contador de Partidas</h2>
            <p>Número de partidas jogadas: {partidas}</p>
            <button onClick={incrementarPartida}>Adicionar Partida</button>
            <button onClick={resetarContador}>Resetar Contador</button>
        </div>
    );
}

export default ContadorPartidas;
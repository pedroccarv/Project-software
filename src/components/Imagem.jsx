import React from 'react';

function MostrarImagem() {
    const imageUrl = localStorage.getItem('uploadedImageUrl'); // Recupera a URL da imagem do localStorage

    return (
        <div>
            <h1>Imagem Enviada</h1>
            {imageUrl ? (
                <img src={imageUrl} alt="Imagem Enviada" />
            ) : (
                <p>Nenhuma imagem para exibir.</p>
            )}
        </div>
    );
}

export default MostrarImagem;
import React, { useState } from 'react';
import '../styles/UploadImagem.css';
import { Link } from 'react-router-dom';
import TennisImage from '../imagens/tennis.png';
import VoleiImage from '../imagens/voleidearei.png';
import futvoleiImage from '../imagens/Futvolei.png';


function UploadImagem() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) {
            setUploadStatus('Por favor, selecione uma imagem.');
            return;
        }

        const formData = new FormData();
        formData.append('imagem', image);

        try {
            const response = await fetch('http://localhost:5174/upload-imagem', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setUploadStatus(`Imagem enviada com sucesso!`);
                localStorage.setItem('uploadedImageUrl', result.imageUrl); // Armazena a URL da imagem
            } else {
                setUploadStatus(`Erro ao enviar a imagem: ${result.message}`);
            }
        } catch (error) {
            setUploadStatus(`Erro ao conectar ao servidor: ${error.message}`);
        }
    };


    return (
        <div className='container-img'>
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
                <Link to="/imagem" className="link-rota">Imagem</Link>
            </div>
            <div className="imagens">
              <img className='TennisImage' src={TennisImage} alt="BeachTennis" />
              <img className='VoleiImage' src={VoleiImage} alt="Volleyball" />
              <img className='futvoleiImage' src={futvoleiImage} alt="Futvolei" />

            </div>
            <div className="upload-imagem-container">
                <input type="file" onChange={handleImageChange} />
                {preview && <img src={preview} alt="Pré-visualização" />}
                <button onClick={handleUpload}>Enviar Imagem</button>
                {uploadStatus && <p>{uploadStatus}</p>}
            </div>
        </div>
    );
}

export default UploadImagem;


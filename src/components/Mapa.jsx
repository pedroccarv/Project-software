import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Mapa({ latitude, longitude }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = function() {
      new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 15
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return (
    <div>
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
    <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
}

export default Mapa;
// import React, { useEffect } from 'react';

// const Mapa = () => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_DE_API;
//     script.async = true;
//     script.defer = true;
//     script.onload = () => {
//       const map = new window.google.maps.Map(document.getElementById('map'), {
//         center: { lat: -23.55052, lng: -46.633308 },
//         zoom: 12,
//       });
//     };
//     document.head.appendChild(script);
//   }, []);

//   return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
// };

// export default Mapa;
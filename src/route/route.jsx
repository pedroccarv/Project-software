import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Cadastro from '../components/Cadastro';
import RecuperarSenha from '../components/RecuperarSenha';
import EditarPerfil from '../components/EditarPerfil';
import Mapa from '../components/Mapa';
import FavoritarPartida from '../components/FavoritarPartida';
import Partidas from '../models/Partidas';
import DetalhesPartida from '../pages/DetalhesPartida';
import CadastroPartida from '../controllers/CadastroPartida';
import HistoricoPartidas from '../pages/HistoricoPartidas';
import Pagamento from '../pages/Pagamento';
import Contato from '../pages/Contato';
import Chat from '../components/chat';
import Notificacoes from '../components/Notificacoes';
import UploadImagem from '../components/UploadImagem';
import AvaliacaoPartida from '../components/AvaliacaoPartida';
import ConvidarAmigos from '../components/ConvidarAmigos';
import HistoricoConquistas from '../components/HistoricoConquistas';
import Agendar from '../components/Agendarquadra';
import ContadorPartidas from '../components/ContadorPartidas';
import Usuario from '../components/Usuario';
import PrivateRoute from '../route/privateRoute'; // Importe o PrivateRoute
import Pagina from '../components/LandingPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial de Cadastro */}
        <Route path="/" element={<Cadastro />} />

        {/* Rotas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />

        {/* Rotas de perfil e ajustes */}
        <Route
          path="/editar-perfil"
          element={
            <PrivateRoute>
              <EditarPerfil />
            </PrivateRoute>
          }
        />

        {/* Mapa e funcionalidades de arena */}
        <Route
          path="/mapa"
          element={
            <PrivateRoute>
              <Mapa />
            </PrivateRoute>
          }
        />
        <Route
          path="/favoritar-partida"
          element={
            <PrivateRoute>
              <FavoritarPartida />
            </PrivateRoute>
          }
        />

        {/* Rotas relacionadas a partidas */}
        <Route
          path="/partidas"
          element={
            <PrivateRoute>
              <Partidas />
            </PrivateRoute>
          }
        />
        <Route
          path="/detalhes-partida/:id"
          element={
            <PrivateRoute>
              <DetalhesPartida />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastro-partida"
          element={
            <PrivateRoute>
              <CadastroPartida />
            </PrivateRoute>
          }
        />
        <Route
          path="/historico-partidas"
          element={
            <PrivateRoute>
              <HistoricoPartidas />
            </PrivateRoute>
          }
        />
        <Route
          path="/contador-partidas"
          element={
            <PrivateRoute>
              <ContadorPartidas />
            </PrivateRoute>
          }
        />

        {/* Funcionalidades adicionais */}
        <Route
          path="/pagamento"
          element={
            <PrivateRoute>
              <Pagamento />
            </PrivateRoute>
          }
        />
        <Route
          path="/contato"
          element={
            <PrivateRoute>
              <Contato />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/notificacoes"
          element={
            <PrivateRoute>
              <Notificacoes />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-imagem"
          element={
            <PrivateRoute>
              <UploadImagem />
            </PrivateRoute>
          }
        />
        <Route
          path="/avaliacao-partida"
          element={
            <PrivateRoute>
              <AvaliacaoPartida />
            </PrivateRoute>
          }
        />
        <Route
          path="/convidar-amigos"
          element={
            <PrivateRoute>
              <ConvidarAmigos />
            </PrivateRoute>
          }
        />
        <Route
          path="/historico-conquistas"
          element={
            <PrivateRoute>
              <HistoricoConquistas />
            </PrivateRoute>
          }
        />

        {/* Agendamento de quadra */}
        <Route
          path="/agendar"
          element={
            <PrivateRoute>
              <Agendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario"
          element={
            <PrivateRoute>
              <Usuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/pagina"
          element={
            <PrivateRoute>
              <Pagina />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

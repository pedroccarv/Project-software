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
import Usuario from '../components/Usuario'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial de Partidas */}
        <Route path="/" element={<Partidas />} />

        {/* Rotas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />

        {/* Rotas de perfil e ajustes */}
        <Route path="/editar-perfil" element={<EditarPerfil />} />

        {/* Mapa e funcionalidades de arena */}
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/favoritar-partida" element={<FavoritarPartida />} />

        {/* Rotas relacionadas a partidas */}
        <Route path="/detalhes-partida/:id" element={<DetalhesPartida />} />
        <Route path="/cadastro-partida" element={<CadastroPartida />} />
        <Route path="/historico-partidas" element={<HistoricoPartidas />} />
        <Route path="/contador-partidas" element={<ContadorPartidas />} /> {/* Nova rota */}

        {/* Funcionalidades adicionais */}
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/upload-imagem" element={<UploadImagem />} />
        <Route path="/avaliacao-partida" element={<AvaliacaoPartida />} />
        <Route path="/convidar-amigos" element={<ConvidarAmigos />} />
        <Route path="/historico-conquistas" element={<HistoricoConquistas />} />
        
        {/* Agendamento de quadra */}
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/usuario" element={<Usuario />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
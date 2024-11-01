import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Cadastro from '../components/Cadastro';
import EditarPerfil from '../components/EditarPerfil';
import Partidas from '../models/Partidas';
import Pagamento from '../pages/Pagamento';
import Contato from '../pages/Contato';
import Notificacoes from '../components/Notificacoes';
import ConvidarAmigos from '../components/ConvidarAmigos';
import Agendar from '../components/Agendarquadra';
import Usuario from '../components/Usuario';
import PrivateRoute from '../route/privateRoute'; // Importe o PrivateRoute
import Pagina from '../components/LandingPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial de Cadastro */}
        <Route path="/" element={<Pagina />} />

        {/* Rotas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Rotas de perfil e ajustes */}
        <Route
          path="/editar-perfil"
          element={
            <PrivateRoute>
              <EditarPerfil />
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
          path="/notificacoes"
          element={
            <PrivateRoute>
              <Notificacoes />
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

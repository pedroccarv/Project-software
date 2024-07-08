import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Cadastro from '../components/Cadastro';
import RecuperarSenha from '../components/RecuperarSenha';
import EditarPerfil from '../components/EditarPerfil';
import Mapa from '../components/Mapa';
import FavoritarPartida from '../components/FavoritarPartida';
import Partidas from '../pages/Partidas';
import DetalhesPartida from '../pages/DetalhesPartida';
import CadastroPartida from '../pages/CadastroPartida';
import HistoricoPartidas from '../pages/HistoricoPartidas';
import Pagamento from '../pages/Pagamento';
import Contato from '../pages/Contato';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Partidas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/favoritar-partida" element={<FavoritarPartida />} />
        <Route path="/detalhes-partida/:id" element={<DetalhesPartida />} />
        <Route path="/cadastro-partida" element={<CadastroPartida />} />
        <Route path="/historico-partidas" element={<HistoricoPartidas />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
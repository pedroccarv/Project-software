import React from 'react';
import { Toaster } from 'sonner'; // Importe o Toaster
import './App.css'; // Seu CSS global
import './styles/Toaster.css'; // Se houver CSS específico para o Toaster

function App() {
  return (
    <div>
      <Toaster />
      {/* Outros componentes e conteúdo da sua aplicação */}
    </div>
  );
}

export default App;

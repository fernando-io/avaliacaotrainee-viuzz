import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Funcionarios from './pages/funcionarios';
import { AlertProvider } from './contexts/alertContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login loginFn={handleLogin} />} />
          <Route path="/cadastro" element={isAuthenticated ? <Cadastro /> : <Navigate to="/login" />} />
          <Route path="/funcionarios" element={isAuthenticated ? <Funcionarios /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;
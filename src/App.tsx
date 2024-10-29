import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 
'react-router-dom';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro'; 
import Funcionarios from './pages/funcionarios/funcionarios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/cadastro" element={isAuthenticated ? <Cadastro /> : <Login onLogin={handleLogin} />} />
        <Route path="/funcionarios" element={isAuthenticated ? <Funcionarios /> : <Login onLogin={handleLogin} />} />
      </Routes>
  </Router>
  );
}

export default App;

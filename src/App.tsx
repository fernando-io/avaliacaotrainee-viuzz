import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 
'react-router-dom';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro'; 
import Funcionarios from './pages/funcionarios/funcionarios';
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
        <Route path="/cadastro" element={isAuthenticated ? <Cadastro /> : <Login loginFn={handleLogin} />} />
        <Route path="/funcionarios" element={isAuthenticated ? <Funcionarios /> : <Login loginFn={handleLogin} />} />
      </Routes>
    </Router>
    </AlertProvider>
  );
}

export default App;

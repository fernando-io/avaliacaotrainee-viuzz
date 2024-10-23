import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 
'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Login from './pages/login';
import Cadastro from './pages/cadastro'; 
import Funcionarios from './pages/funcionarios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          <Button color="inherit" component={RouterLink} to="/cadastro">Cadastro de Funcionários</Button>
          <Button color="inherit" component={RouterLink} to="/funcionarios">Lista de Funcionários</Button>
        </Toolbar>
      </AppBar>
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

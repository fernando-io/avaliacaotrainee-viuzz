import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 
'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Login from './components/login';
import Cadastro from './components/cadastro'; 
import Funcionarios from './components/funcionarios';


function App() {
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
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
      </Routes>
  </Router>
  );
}

export default App;

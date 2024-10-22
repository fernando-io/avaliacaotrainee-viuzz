import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box } from '@mui/material';

interface LoginProps {
    onLogin: () => void;
}

const Login:React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (email === 'teste@admin.com' && senha === 'admin') {
        alert('Login realizado!');
        onLogin();
        navigate('/funcionarios');
      } else {
        alert('Email ou senha incorretos!');
      }
    };

    return (
        <Container>
            <Box>
                <h1>Faça seu Login</h1>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <TextField
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Entrar
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
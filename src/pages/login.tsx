import React, { useState } from 'react';
import { CustomButton } from '../components/customButton';
import { Grid2, Typography, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../contexts/alertContext';

const Login: React.FC<{ loginFn: () => void }> = ({ loginFn }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === 'teste@admin.com' && senha === 'admin') {
            loginFn();
            navigate('/funcionarios');
            showAlert('Login realizado!', 'success');
        } else {
            showAlert('Email ou senha incorretos!', 'error');
        }
    };

    return (
        <Grid2
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '80vh' }}
        >
            <Typography
                variant="h4"
            >
                Faça seu Login
            </Typography>
            <Box
                component="form"
                sx={{ width: '400px' }}
                onSubmit={handleLogin}
            >
                <Grid2
                    container spacing={1}
                    direction="column"
                >
                    <Grid2>
                        <TextField
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid2>
                    <Grid2>
                        <TextField
                            label="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid2>
                    <Grid2>
                        <CustomButton
                            type="submit"
                            style={{ width: '100%' }}
                        >
                            Entrar
                        </CustomButton>
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    );
};

export default Login;
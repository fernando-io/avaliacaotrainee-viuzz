import React, { useState } from 'react';
import { LoginProps } from '../../interfaces/interfaces'
import { useLoginHandler } from './loginHandler';
import { CustomButton } from '../../components/button/customButton';
import { Grid2, Typography, Box, TextField } from '@mui/material';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const handleLogin = useLoginHandler(onLogin);

    return (
        <Grid2 container spacing={1} direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '75vh' }}>
            <Typography variant="h4" gutterBottom>Faça seu Login</Typography>
            <Box component="form" onSubmit={(e) => handleLogin(e, email, senha)} sx={{ width: '400px' }}>
                <Grid2 container spacing={1} direction="column">
                    <Grid2 component="div">
                        <TextField
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid2>
                    <Grid2 component="div">
                        <TextField
                            label="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid2>
                    <Grid2 component="div">
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
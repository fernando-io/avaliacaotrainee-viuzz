// cadastro.tsx
import React, { useState } from 'react';
import { Grid2, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCadastroHandler } from './cadastroHandler';
import { CustomButton } from '../../components/button/customButton';

const Cadastro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [cargo, setCargo] = useState('');
    const { cidades, cadastrarFuncionario } = useCadastroHandler();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        cadastrarFuncionario(nome, cidade, cargo);
        alert('Funcionário cadastrado com sucesso!\nVá até a lista de funcionários para visualizá-lo.');
        setNome('');
        setCidade('');
        setCargo('');
    };

    return (
        <Grid2 container spacing={1} direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '60vh' }}>
            <Typography variant="h4" gutterBottom>Cadastre um Novo Funcionário</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '400px' }}>
                <Grid2 container spacing={1} direction="column">
                    <Grid2 component="div">
                        <TextField
                            label="Nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid2>
                    <Grid2 component="div">
                        <FormControl fullWidth required>
                            <InputLabel>Cidade</InputLabel>
                            <Select
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            >
                                {cidades.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.nome}
                                    >
                                        {item.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 component="div">
                        <TextField
                            label="Cargo"
                            type="text"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid2>
                    <Grid2 component="div">
                        <CustomButton
                            type="submit"
                            style={{ width: '100%' }}
                        >
                            Cadastrar
                        </CustomButton>
                    </Grid2>    
                </Grid2>           
            </Box>
        </Grid2>
    );
};

export default Cadastro;
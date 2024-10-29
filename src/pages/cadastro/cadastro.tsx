// cadastro.tsx
import React, { useState } from 'react';
import { Grid2, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCadastroHandler } from './cadastroHandler';
import { CustomButton } from '../../components/button/customButton';
import NavBar from '../../components/navBar/navBar';
import { useAlert } from '../../contexts/alertContext';

const Cadastro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [cargo, setCargo] = useState('');
    const { cidades, cadastrarFuncionario } = useCadastroHandler();
    const { showAlert } = useAlert();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        cadastrarFuncionario(nome, cidade, cargo);
        showAlert('Funcionário cadastrado com sucesso!\nVá até a lista de funcionários para visualizá-lo.', 'success');
        setNome('');
        setCidade('');
        setCargo('');
    };

    return (
        <>
            <NavBar />
            <Grid2 container spacing={1} display="flex" direction="column" justifyContent="center" alignItems="center" sx={{minHeight: '80vh'}}>
                <Typography variant="h4" gutterBottom>Cadastre um Novo Funcionário</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '400px' }}>
                    <Grid2 container spacing={1} direction="column">
                        <Grid2>
                            <TextField
                                label="Nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                fullWidth
                            />
                        </Grid2>
                        <Grid2>
                            <FormControl fullWidth required>
                                <InputLabel>Cidade</InputLabel>
                                <Select
                                    label="Cidade"
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
                        <Grid2>
                            <TextField
                                label="Cargo"
                                type="text"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                                required
                                fullWidth
                            />
                        </Grid2>
                        <Grid2>
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
        </>
    );
};

export default Cadastro;
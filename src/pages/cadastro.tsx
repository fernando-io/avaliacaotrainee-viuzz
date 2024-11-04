import React, { useState } from 'react';
import { Grid2, Typography, Box, TextField } from '@mui/material';
import { CustomButton } from '../components/customButton';
import NavBar from '../components/navBar';
import { useAlert } from '../contexts/alertContext';
import CidadesAutocomplete from '../components/autoComplete';
import { Cidade } from '../hooks/ibgeApi';

export interface Funcionario {
    id: number;
    nome: string;
    cidade: string;
    cargo: string;
}

const Cadastro: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cidade: null as Cidade | null,
        cargo: ''
    });

    const { showAlert } = useAlert();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.cidade) {
            cadastrarFuncionario({
                id: Date.now(),
                nome: formData.nome,
                cidade: formData.cidade.nome,
                cargo: formData.cargo,
            });

            showAlert('Funcionário cadastrado com sucesso!\nVá até a lista de funcionários para visualizá-lo.', 'success');
            setFormData({ nome: '', cidade: null, cargo: '' });
        } else {
            showAlert('Por favor, selecione uma cidade.', 'error');
        }
    };

    const cadastrarFuncionario = (funcionario: Funcionario) => {
        const listaDeFuncionarios: Funcionario[] = JSON.parse(localStorage.getItem('funcionarios') || '[]');

        listaDeFuncionarios.push(funcionario);
        localStorage.setItem('funcionarios', JSON.stringify(listaDeFuncionarios));
    };

    return (
        <>
            <NavBar />
            <Grid2
                container
                spacing={1}
                display="flex"
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '80vh' }}
            >
                <Typography
                    variant="h4"
                >
                    Cadastre um Novo Funcionário
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleRegister}
                    sx={{ width: '400px' }}
                >
                    <Grid2
                        container
                        spacing={1}
                        direction="column"
                    >
                        <Grid2>
                            <TextField
                                label="Nome"
                                type="text"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                required
                                fullWidth
                            />
                        </Grid2>
                        <Grid2>
                            <CidadesAutocomplete
                                onChange={(cidade) => setFormData({ ...formData, cidade })}
                            />
                        </Grid2>
                        <Grid2>
                            <TextField
                                label="Cargo"
                                type="text"
                                value={formData.cargo}
                                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
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
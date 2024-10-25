import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { Funcionario } from '../interfaces/interfaces';
import { Cidade } from '../interfaces/interfaces';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [cargo, setCargo] = useState('');
    const [cidades, setCidades] = useState<Cidade[]>([]);

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
            .then(response => response.json())
            .then((data: Cidade[]) => {
                const cidadesOrdenadas = data.sort((a, b) => a.nome.localeCompare(b.nome));
                setCidades(cidadesOrdenadas);
            })
            .catch(error => console.error('Erro ao buscar cidade', error));
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const novoFuncionario: Funcionario = {
            id: Date.now(),
            nome,
            cidade,
            cargo
        };

        const funcionariosSalvos = localStorage.getItem('funcionarios');
        const listaDeFuncionarios: Funcionario[] = funcionariosSalvos ? JSON.parse(funcionariosSalvos) : [];
        
        listaDeFuncionarios.push(novoFuncionario);

        localStorage.setItem('funcionarios', JSON.stringify(listaDeFuncionarios));

        setNome('');
        setCidade('');
        setCargo('');
    };

    return (
        <Container>
            <Box>
                <h1>Cadastre um Novo Funcionário</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <br />
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
                    <br />
                    <TextField
                        label="Cargo"
                        type="text"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        required
                    />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Cadastrar
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Cadastro;
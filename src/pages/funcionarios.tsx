import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem  } from '@mui/material';
import { Funcionario } from '../interfaces/interfaces';
import { Cidade } from '../interfaces/interfaces';

const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [funcionarioEdit, setFuncionarioEdit] = useState<Partial<Funcionario>>({});
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

    useEffect(() => {
        const funcionariosSalvos = localStorage.getItem('funcionarios');
        if (funcionariosSalvos) {
            setFuncionarios(JSON.parse(funcionariosSalvos));
        }
    }, []);

    const handleDelete = (id: number) => {
        const updatedFuncionarios = funcionarios.filter(funcionario => funcionario.id !== id);
        setFuncionarios(updatedFuncionarios);
        localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios));
    };

    const handleEdit = (funcionario: Funcionario) => {
        setFuncionarioEdit(funcionario);
        setOpenEditDialog(true);
    };

    const handleUpdate = () => {
        const updatedFuncionarios = funcionarios.map(funcionario =>
            funcionario.id === funcionarioEdit.id ? { ...funcionarioEdit } as Funcionario : funcionario
        );
        setFuncionarios(updatedFuncionarios);
        localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios));
        setOpenEditDialog(false);
    };

    const columns: GridColDef[] = [
        { 
            field: 'nome', 
            headerName: 'Nome', 
            type: 'string',
            width: 150 },
        {
            field: 'cidade',
            headerName: 'Cidade',
            type: 'string',
            width: 150,
        },
        {
            field: 'cargo',
            headerName: 'Cargo',
            type: 'string',
            width: 150,
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => handleEdit(params.row)}
                        style={{ marginRight: 8 }}
                    >
                        Editar
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Deletar
                    </Button>
                </>
            )
        }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
            <Paper sx={{ height: 400, width: 650 }}>
                <DataGrid
                    rows={funcionarios}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
            
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Funcionário</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        fullWidth
                        margin="dense"
                        value={funcionarioEdit.nome || ''}
                        onChange={(e) => setFuncionarioEdit({ ...funcionarioEdit, nome: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense" required>
                        <InputLabel>Cidade</InputLabel>
                        <Select
                            value={funcionarioEdit.cidade || ''}
                            onChange={(e) => setFuncionarioEdit({ ...funcionarioEdit, cidade: e.target.value })}
                        >
                            {cidades.map((item) => (
                                <MenuItem key={item.id} value={item.nome}>
                                    {item.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Cargo"
                        fullWidth
                        margin="dense"
                        value={funcionarioEdit.cargo || ''}
                        onChange={(e) => setFuncionarioEdit({ ...funcionarioEdit, cargo: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Funcionarios;
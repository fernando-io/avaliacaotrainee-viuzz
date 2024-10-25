import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography, Grid2, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Funcionario } from '../../interfaces/interfaces';
import { useFuncionariosHandler } from './funcionariosHandler';
import { CustomButton } from '../../components/button/customButton';

const Funcionarios = () => {
    const { funcionarios, cidades, handleDelete, handleUpdate } = useFuncionariosHandler();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [funcionarioEdit, setFuncionarioEdit] = useState<Partial<Funcionario>>({});
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFuncionarios = funcionarios.filter(funcionario =>
        funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: GridColDef[] = [
        {
            field: 'nome',
            headerName: 'Nome',
            type: 'string',
            width: 200,
        },
        {
            field: 'cidade',
            headerName: 'Cidade',
            type: 'string',
            width: 200,
        },
        {
            field: 'cargo',
            headerName: 'Cargo',
            type: 'string',
            width: 200,
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 200,
            renderCell: (params) => (
                <>
                    <CustomButton
                        onClick={() => {
                            setFuncionarioEdit(params.row);
                            setOpenEditDialog(true);
                        }}
                        style={{ marginRight: 8, width: '85px' }}
                    >
                        Editar
                    </CustomButton>
                    <CustomButton
                        color="secondary"
                        onClick={() => handleDelete(params.row.id)}
                        style={{ width: '85px' }}
                    >
                        Deletar
                    </CustomButton>
                </>
            )
        }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Grid2 container spacing={1} direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
            <Typography variant="h4" gutterBottom>Lista de Funcionários</Typography>
            <Paper sx={{ height: 400, width: 800 }}>
                <TextField
                    label="Buscar por Nome"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <DataGrid
                    rows={filteredFuncionarios}
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
                    <CustomButton onClick={() => setOpenEditDialog(false)}>
                        Cancelar
                    </CustomButton>
                    <CustomButton onClick={() => {
                        handleUpdate(funcionarioEdit);
                        setOpenEditDialog(false);
                    }}>
                        Salvar
                    </CustomButton>
                </DialogActions>
            </Dialog>
        </Grid2>
    );
};

export default Funcionarios;
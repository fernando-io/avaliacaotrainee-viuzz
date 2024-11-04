import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography, Grid2, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Funcionario } from './cadastro';
import { Cidade } from '../hooks/ibgeApi';
import { CustomButton } from '../components/customButton';
import NavBar from '../components/navBar';
import CidadesAutocomplete from '../components/autoComplete';
import { useAlert } from '../contexts/alertContext';

const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [funcionarioEdit, setFuncionarioEdit] = useState<Partial<Funcionario>>({ nome: '', cidade: '', cargo: '' });
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [funcionarioDelete, setFuncionarioDelete] = useState<Funcionario | null>(null);

    const { showAlert } = useAlert();

    useEffect(() => {
        const funcionariosSalvos = localStorage.getItem('funcionarios');
        if (funcionariosSalvos) {
            setFuncionarios(JSON.parse(funcionariosSalvos));
        }
    }, []);

    const filteredFuncionarios = funcionarios.filter(funcionario =>
        funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdate = (funcionarioEdit: Partial<Funcionario>) => {
        const updatedFuncionarios = funcionarios.map(funcionario =>
            funcionario.id === funcionarioEdit.id ? { ...funcionarioEdit } as Funcionario : funcionario
        );
        showAlert('Funcionário atualizado com sucesso!', 'success');
        setFuncionarios(updatedFuncionarios);
        localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios));
    };

    const handleDelete = (id: number) => {
        const updatedFuncionarios = funcionarios.filter(funcionario => funcionario.id !== id);
        showAlert('Funcionário deletado com sucesso!', 'success');
        setFuncionarios(updatedFuncionarios);
        localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios));
    };
    
    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', width: 200 },
        { field: 'cidade', headerName: 'Cidade', width: 200 },
        { field: 'cargo', headerName: 'Cargo', width: 200 },
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
                        onClick={() => {
                            setFuncionarioDelete(params.row);
                            setOpenDeleteDialog(true);
                        }}
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
        <>
            <NavBar />
            <Grid2 container spacing={1} direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
                <Typography variant="h4">Lista de Funcionários</Typography>
                
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
                            value={funcionarioEdit.nome}
                            onChange={(e) => setFuncionarioEdit({ ...funcionarioEdit, nome: e.target.value })}
                        />
                        <CidadesAutocomplete
                            onChange={(cidade: Cidade | null) => {
                                setFuncionarioEdit({ ...funcionarioEdit, cidade: cidade?.nome });
                            }}
                        />
                        <TextField
                            label="Cargo"
                            fullWidth
                            margin="dense"
                            value={funcionarioEdit.cargo}
                            onChange={(e) => setFuncionarioEdit({ ...funcionarioEdit, cargo: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <CustomButton onClick={() => setOpenEditDialog(false)}>Cancelar</CustomButton>
                        <CustomButton onClick={() => { handleUpdate(funcionarioEdit); setOpenEditDialog(false); }}>
                            Salvar
                        </CustomButton>
                    </DialogActions>
                </Dialog>

                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                    <DialogContent>
                        Tem certeza de que deseja deletar o funcionário{' '}
                        <strong>{funcionarioDelete?.nome}</strong>?
                    </DialogContent>
                    <DialogActions>
                        <CustomButton onClick={() => setOpenDeleteDialog(false)}>Cancelar</CustomButton>
                        <CustomButton
                            color="secondary"
                            onClick={() => {
                                if (funcionarioDelete) {
                                    handleDelete(funcionarioDelete.id);
                                }
                                setOpenDeleteDialog(false);
                            }}
                        >
                            Confirmar
                        </CustomButton>
                    </DialogActions>
                </Dialog>
            </Grid2>
        </>
    );
};

export default Funcionarios;
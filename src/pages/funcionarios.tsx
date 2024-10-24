import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';

interface Funcionario {
    id: number;
    nome: string;
    cidade: string;
    cargo: string;
}

const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

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

    const columns: GridColDef[] = [
        { 
            field: 'nome', 
            headerName: 'Nome', 
            type: 'string',
            width: 130 },
        {
            field: 'cidade',
            headerName: 'Cidade',
            type: 'string',
            width: 130,
        },
        {
            field: 'cargo',
            headerName: 'Cargo',
            type: 'string',
            width: 130,
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 130,
            renderCell: (params) => (
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(params.row.id)}
                >
                    Deletar
                </Button>
            )
        }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={funcionarios}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}


export default Funcionarios;
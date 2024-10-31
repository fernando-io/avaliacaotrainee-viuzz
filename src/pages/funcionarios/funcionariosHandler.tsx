import { useEffect, useState } from 'react';
import { Funcionario } from '../../interfaces/interfaces';
import { useAlert } from '../../contexts/alertContext';
import { useIbgeApi } from '../../hooks/ibgeApi';

export const useFuncionariosHandler = () => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const cidades = useIbgeApi();
    const { showAlert } = useAlert();

    useEffect(() => {
        const funcionariosSalvos = localStorage.getItem('funcionarios');
        if (funcionariosSalvos) {
            setFuncionarios(JSON.parse(funcionariosSalvos));
        }
    }, []);

    const handleDelete = (id: number) => {
        const updatedFuncionarios = funcionarios.filter(funcionario => funcionario.id !== id);
        showAlert('Funcionário deletado com sucesso!', 'success');
        setFuncionarios(updatedFuncionarios);
        localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios));
    };

    const handleUpdate = (funcionarioEdit: Partial<Funcionario>) => {
        const updatedFuncionarios = funcionarios.map(funcionario =>
            funcionario.id === funcionarioEdit.id ? { ...funcionarioEdit } as Funcionario : funcionario
        );
        showAlert('Funcionário atualizado com sucesso!', 'success');
        setFuncionarios(updatedFuncionarios);
        localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios));
    };

    return {
        funcionarios,
        cidades,
        handleDelete,
        handleUpdate
    };
};
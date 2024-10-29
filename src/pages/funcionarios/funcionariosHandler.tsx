import { useEffect, useState } from 'react';
import { Funcionario } from '../../interfaces/interfaces';
import { Cidade } from '../../interfaces/interfaces';
import { useAlert } from '../../contexts/alertContext';

export const useFuncionariosHandler = () => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const { showAlert } = useAlert();
    
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
        showAlert('Funcionário deletado com sucesso!', 'warning');
        setFuncionarios(updatedFuncionarios);
        localStorage.setItem('funcionarios', JSON.stringify(updatedFuncionarios));
    };

    const handleEdit = (funcionario: Funcionario) => {
        return funcionario;
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
        handleEdit,
        handleUpdate
    };
};
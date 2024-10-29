import { Funcionario } from '../../interfaces/interfaces';
import { useIbgeApi } from '../../hooks/ibgeApi';

export const useCadastroHandler = () => {
    const cidades = useIbgeApi();

    const cadastrarFuncionario = (nome: string, cidade: string, cargo: string) => {
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
    };

    return { cidades, cadastrarFuncionario };
};
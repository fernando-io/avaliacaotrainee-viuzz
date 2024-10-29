import { useEffect, useState } from 'react';
import { Funcionario } from '../../interfaces/interfaces';
import { Cidade } from '../../interfaces/interfaces';

export const useCadastroHandler = () => {
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

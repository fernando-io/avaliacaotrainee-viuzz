import { useEffect, useState } from 'react';
import { Cidade } from '../interfaces/interfaces';

export const useIbgeApi = () => {
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

    return cidades;
};
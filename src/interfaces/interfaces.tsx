export interface LoginProps {
    loginFn: () => void;
}

export interface Funcionario {
    id: number;
    nome: string;
    cidade: string;
    cargo: string;
}

export interface Cidade {
    id: number;
    nome: string;
}
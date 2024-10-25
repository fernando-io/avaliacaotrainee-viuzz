import { useNavigate } from 'react-router-dom';

export const useLoginHandler = (onLogin: () => void) => {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent, email: string, senha: string) => {
        e.preventDefault();

        if (email === 'teste@admin.com' && senha === 'admin') {
            alert('Login realizado!');
            onLogin();
            navigate('/funcionarios');
        } else {
            alert('Email ou senha incorretos!');
        }
    };

    return handleLogin;
};
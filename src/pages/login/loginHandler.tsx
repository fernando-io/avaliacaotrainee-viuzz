import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/alertContext';

export const useLoginHandler = (loginFn: () => void) => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleLogin = (e: React.FormEvent, email: string, senha: string) => {
        e.preventDefault();

        if (email === 'teste@admin.com' && senha === 'admin') {
            showAlert('Login realizado!', 'success');
            loginFn();
            navigate('/funcionarios');
        } else {
            showAlert('Email ou senha incorretos!', 'error');
        }
    };

    return handleLogin;
};
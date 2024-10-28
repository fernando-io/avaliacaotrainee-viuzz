import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material'

const NavBar: React.FC = () => {
    return (
        <AppBar position = "static" >
            <Toolbar>
                <Button color="inherit" component={RouterLink} to="/cadastro">
                    Cadastro de Funcionários
                </Button>
                <Button color="inherit" component={RouterLink} to="/funcionarios">
                    Lista de Funcionários
                </Button>
                <Button color="inherit" component={RouterLink} to="/login" sx={{ marginLeft: 'auto'}}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
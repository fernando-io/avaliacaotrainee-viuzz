import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppBar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Toolbar, Button } from '@mui/material'

const NavBar: React.FC = () => {
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    }

    return (
        <>
            <AppBar position = "static" >
                <Toolbar>
                    <Button color="inherit" component={RouterLink} to="/cadastro">
                        Cadastro de Funcionários
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/funcionarios">
                        Lista de Funcionários
                    </Button>
                    <Button color="inherit" onClick={() => setOpenLogoutDialog(true)} sx={{ marginLeft: 'auto'}}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Dialog
                open={openLogoutDialog}
                onClose={() => setOpenLogoutDialog(false)}
                >
                <DialogTitle>Confirmar Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja sair?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenLogoutDialog(false)} variant="contained">
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            handleLogout();
                            setOpenLogoutDialog(false);
                        }}
                        variant="contained"
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NavBar;
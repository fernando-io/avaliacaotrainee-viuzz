import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from '@mui/material';

interface AlertContextProps {
    showAlert: (message: string, severity: 'success' | 'error' | 'warning') => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' | 'warning' } | null>(null);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const showAlert = (message: string, severity: 'success' | 'error' | 'warning') => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setAlert({ message, severity });
        const newTimeoutId = setTimeout(() => setAlert(null), 4000);
        setTimeoutId(newTimeoutId);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && <Alert
                severity={alert.severity}
                sx={{
                    position: 'fixed',
                    top: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                }}
            >
                {alert.message}
            </Alert>}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) throw new Error('useAlert deve ser usado dentro do AlertProvider');
    return context;
};
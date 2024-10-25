import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
    variant?: "contained";
    color?: "primary" | "secondary";
    type?: "button" | "submit";
    style?: React.CSSProperties;
    onClick?: () => void;
    children: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    variant = "contained",
    color = "primary",
    type,
    style,
    onClick,
    children
}) => {
    return (
        <Button
            variant={variant}
            color={color} type={type}
            style={style}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Cidade, useIbgeApi } from '../hooks/ibgeApi';

function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

interface AsynchronousProps {
    onChange: (cidade: Cidade | null) => void;
}

export default function Asynchronous({ onChange }: AsynchronousProps) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly Cidade[]>([]);
    const [loading, setLoading] = React.useState(false);
    const cidades = useIbgeApi();

    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);
            await sleep(1e3);
            setLoading(false);

            setOptions([...cidades]);
        })();
    };

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    return (
        <Autocomplete
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option.nome === value.nome}
            getOptionLabel={(option) => option.nome}
            options={options}
            loading={loading}
            onChange={(e, value) => {
                if (value) {
                    onChange(value);
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Cidade"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        },
                    }}
                />
            )}
        />
    );
}

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
    name: '',
    email: '',
    password: ''
};

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener un @'],
    password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
    name: [(value) => value.length >= 1, 'El nombre es obligatorio'],
};

export function RegisterPage() {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { name, email, password, onInputChange,
        nameValid, emailValid, passwordValid, isFormValid } = useForm(formData, formValidations);

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    function onSubmit(event) {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) {
            return;
        }
        dispatch(startCreatingUserWithEmailPassword({ name, email, password }));

    }


    return (
        <AuthLayout title="Crear una cuenta">
            <h1>FormValid: {isFormValid ? 'Valido' : 'Incorrecto'}</h1>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label="Nombre completo" type="text" placeholder="Nombre completo" name="name" fullWidth
                            value={name} onChange={onInputChange}
                            error={!!nameValid && formSubmitted}
                            helperText={nameValid} />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label="Correo" type="email" placeholder="correo@gmail.com" fullWidth name="email" value={email} onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid} />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth name="password" value={password} onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid} />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} display={!!errorMessage ? '' : 'none'}>
                        <Grid item xs={12} sm={12}>
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={12}>
                            <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuthentication}>Crear cuenta</Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography>¿Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login">Ingresar</Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}

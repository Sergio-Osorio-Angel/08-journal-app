import  Google  from "@mui/icons-material/Google";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks/useForm";
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
    email: '',
    password: ''
}
export function LoginPage() {

    const { email, password, onInputChange } = useForm(formData);

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);
    const isAuthenticating = useMemo(() => status === 'checking', [status]);


    function onSubmit(event) {
        event.preventDefault();
        dispatch(startLoginWithEmailPassword({ email, password }));
    }

    function onGoogleSignIn(event) {
        dispatch(startGoogleSingIn());
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster" data-testid='submit-form'>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label="Correo" type="email" placeholder="correo@gmail.com" name="email" fullWidth value={email} onChange={onInputChange} />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label="Contraseña" type="password" placeholder="Contraseña" name="password" fullWidth value={password} onChange={onInputChange} 
                        inputProps={{'data-testid':'password'}}/>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }} display={!!errorMessage ? '' : 'none'}>
                        <Grid item xs={12} sm={12}>
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant="contained" fullWidth disabled={isAuthenticating}>Login</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button onClick={onGoogleSignIn} variant="contained" fullWidth disabled={isAuthenticating} data-testid='btn-google-singin'>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color="inherit" to="/auth/register">Crear una cuenta</Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>

    )
}

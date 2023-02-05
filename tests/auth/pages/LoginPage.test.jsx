import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSingIn: () => mockStartGoogleSingIn,
    startLoginWithEmailPassword:  ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password})
    }
}));

jest.mock('react-redux', ()=> ({
    ...jest.requireActual('react-redux'),
    // Solo se requiere sobreescribir el useDispatch
    useDispatch: () => (fn) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    // Pre cargar un state a los reducer del store
    preloadedState: {
        auth: notAuthenticatedState
    }
});


describe('Tests - LoginPage', () => {

    beforeEach(()=> {
        jest.clearAllMocks();
    })

    test('debe de mostrar el componente correctamente', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    })

    test('debe de llamar el startGoogleSingIn al dar click en el boton de Google', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        const btnGoogle = screen.getByTestId('btn-google-singin');
        fireEvent.click(btnGoogle);
        expect(mockStartGoogleSingIn).toHaveBeenCalled();
    })

    test('debe de llamar el startLoginWithEmailPassword al enviar el formulario', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const email = 'sergio@gmail.com';
        const password = '12345';

        const emailField = screen.getByRole('textbox', {name: 'Correo'});
        fireEvent.change(emailField, {target: {name:'email', value: email}});

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, {target: {name:'password', value: password}});

        const form = screen.getByTestId('submit-form');
        fireEvent.submit(form);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        })

    })

})
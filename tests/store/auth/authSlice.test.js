import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('tests authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        expect(authSlice.name).toBe('auth');

        // Estableciendo el estado inicial del Slice
        // El segundo parámetro es la acción a realizar con su correspondiente payload
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
    });

    test('debe de realiar la autenticación', () => {
        // Estableciendo el estado inicial del Slice y una acción
        // El segundo parámetro es la acción a realizar con su correspondiente payload
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated',
            email: demoUser.email,
            uid: demoUser.uid,
            userName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: demoUser.errorMessage,
        });
    });

    test('debe de realizar el logout sin argumentos', () => {
        // Estableciendo el estado inicial del Slice y una acción
        // El segundo parámetro es la acción a realizar con su correspondiente payload
        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            userName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout con argumentos', () => {
        // Estableciendo el estado inicial del Slice y una acción
        // El segundo parámetro es la acción a realizar con su correspondiente payload
        const state = authSlice.reducer(authenticatedState, logout({errorMessage: 'Credenciales invalidas'}));

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            userName: null,
            photoURL: null,
            errorMessage: 'Credenciales invalidas'
        });
    });

    test('debe de realizar el checking', () => {
        // Estableciendo el estado inicial del Slice y una acción
        // El segundo parámetro es la acción a realizar con su correspondiente payload
        const state = authSlice.reducer(initialState, checkingCredentials());

        expect(state.status).toBe('checking');

    });
})
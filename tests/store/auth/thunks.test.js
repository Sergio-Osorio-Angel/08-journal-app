import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSingIn, startLoginWithEmailPassword, startLogoutFirebase } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('tests authThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('debe de invocar el checkingAuthentication', async () => {
        // Los primeros parentesis es la invocación de la función
        // Los segundos parentesis son el valor de retorno de la función
        await checkingAuthentication()(dispatch);

        // Se llama el reducer asíncrono que modifica el store
        // de esta forma se verifica que se hizo dispatch del reducer
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    })

    test('startGoogleSingIn - debe de llamar checkingCredentials y login - Exito', async () => {
        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue(loginData);

        // thunk
        await startGoogleSingIn()(dispatch);

        // Verificar los dispatch
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    })

    test('startGoogleSingIn - debe de llamar checkingCredentials y logout - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Error con Google' };
        await singInWithGoogle.mockResolvedValue(loginData);

        // thunk
        await startGoogleSingIn()(dispatch);

        // Verificar los dispatch
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));
    })


    test('startLoginWithEmailPassword - debe de llamar checkingCredentials y login - Exito', async () => {
        const aux = { ...demoUser, displayName: demoUser.userName };
        delete aux.userName;

        const loginData = { ok: true, ...aux };
        const formData = { email: demoUser.email, password: '12345' };

        // Mock servicio de tercero
        await loginWithEmailPassword.mockResolvedValue(loginData);

        // Thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        // Verificar los dispatch
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({
            uid: loginData.uid, email: loginData.email,
            displayName: loginData.displayName,
            photoURL: loginData.photoURL,
            errorMessage: loginData.errorMessage
        }));
    })

    test('startLoginWithEmailPassword - debe de llamar checkingCredentials y login - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Error al iniciar sesión' };
        const formData = { email: demoUser.email, password: '12345' };

        // Mock servicio de tercero
        await loginWithEmailPassword.mockResolvedValue(loginData);

        // Thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        // Verificar los dispatch
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));
    })

    test('startLogoutFirebase - debe de llamar logoutFirebase', async () => {

        //Tunk
        await startLogoutFirebase()(dispatch);

        // Verificar los dispatch
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(logout());
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());

    })

    test('startCreatingUserWithEmailPassword - debe de llamar checkingCredentials y login - Exito', async () => {

        const formData = { email: demoUser.email, password: '12345', name: demoUser.userName };
        const responseData = {
            ok: true, uid: demoUser.uid, displayName: demoUser.userName,
            errorMessage: demoUser.errorMessage, photoURL: demoUser.errorMessage
        };

        // Simular servicio de tercero
        await registerUserWithEmailPassword.mockResolvedValue(responseData);

        //thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        // Verificar dispatch
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({
            uid: responseData.uid, displayName: responseData.displayName,
            email: formData.email, photoURL: responseData.photoURL
        }));
    })

    test('startCreatingUserWithEmailPassword - debe de llamar checkingCredentials y login - Error', async () => {

        const formData = { email: demoUser.email, password: '12345', name: demoUser.userName };
        const responseData = {
            ok: false, errorMessage: 'Error al crear cuenta'
        };

        // Simular servicio de tercero
        await registerUserWithEmailPassword.mockResolvedValue(responseData);

        //thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        // Verificar dispatch
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: responseData.errorMessage}));
    })


}) 
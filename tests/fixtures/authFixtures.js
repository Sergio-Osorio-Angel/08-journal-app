export const initialState = {
    status: 'not-authenticated', // 'checking',  'authenticated'
    uid: null,
    email: null,
    userName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '12345',
    email: 'demo@gmail.com',
    userName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null
}
export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    userName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: '12345',
    email: 'demo@gmail.com',
    userName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null
}
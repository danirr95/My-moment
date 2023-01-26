import { createSlice } from '@reduxjs/toolkit';

//Almacenamos en una constante 'authSlice' el Slice que creamos. Un Slice is a function that accepts an initial state | an object full of reducer functions | and a "slice name" | and automatically generates action creators and action types that correspond to the reducers and state.
export const authSlice = createSlice({
    name: 'auth',
    //Initial state object
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    //Objeto que contiene los distintos reducers para solventar las distintas actions que deseemos | Cada reducer es colocado como una propiedad (que a su vez será un objeto)
    reducers: {
        //Cada reducer creado y colocado como propiedad del objeto reducers, no es mas que una función pura que obtiene el state y hace alguna modificación sobre este
        //En este reducer 'login' recibimos nuestro objeto state para modificarlo, así como la action que dispará este 'login', de dicha action desestructuramos solo el payload, el cual contiene los datos que deben ser modificados en nuestro state, así como el contenido que deberán llevar | Esta función establece en el status todas las props abajo indicadas en el state junto con su nombre 
        login: (state, { payload }) => {
            state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        //En este reducer 'logout' recibimos tambien el state para su modificacion, asi como el payload deestructurado de la action que dispara este reducer | Esta función establece todas las props del state abajo indicadas en null
        logout: (state, { payload }) => {
            // 'checking', 'not-authenticated', 'authenticated'
            state.status = 'not-authenticated',
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            //Establece la prop 'errorMessage' en el caso de que dicha prop venga en el payload (eso lo expresamos con el signo de interrogación) 
            state.errorMessage = payload?.errorMessage;
        },
        //Creamos un reducer para cuando esté en proceso la verificación del user, con esto podremos evitar doble envío de formularios por parte del user, así como evitaremos mostrar información no deseada al user no autenticado | este reducer modifica nuestro state y coloca su propiedad 'status' en checking
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

// Action creators are generated for each case reducer function
// Action creators for the types of actions that are handled by the slice reducer | Exportamos las actions creadas, dichas actions se almacenan en la propiedad actions del objeto authSlice (que no es mas que es slice que hemos creado arriba)
export const { login, logout, checkingCredentials } = authSlice.actions;
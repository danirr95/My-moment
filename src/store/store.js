import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { journalSlice } from './journal';

//Almacenamos en la constante 'store' nuestro store para toda la app
export const store = configureStore({
    //En la prop 'reducer' colocamos a single reducer function that will be used as the root reducer, or an object of slice reducers that will be passed to combineReducers().
    reducer: {
        //Indicamos cada reducer que deseamos que sea servido por nuestro store, colocamos su nombre como nombre de la propiedad a la que representa dicho reducer e indicamos que su valor será la referencia al objeto reducer de nuestro objeto creado authSlice o journalSlice
        auth: authSlice.reducer,
        journal: journalSlice.reducer
    },
});
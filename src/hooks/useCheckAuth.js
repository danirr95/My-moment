import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';

//custom hook que almacena el status para cuando se recarga la página, así el user no tiene que volver a autenticarse una vez que recargue la página
export const useCheckAuth = () => {

    //Desestructuramos el status de nuestro store, el cual llamamos usando el useSelector el cual recibe todo el state y le indicamos que nos devuelve el slice cuyo name es auth, ya que ahi es donde se encuentra la propo status que nosotros deseamos
    const { status } = useSelector(state => state.auth);
    //Almacenamos en la cosntante 'dispatch' la funcion utilizada para despachar actions hacia nuestro store
    const dispatch = useDispatch();

    //Usamos un useEffect que se ejecutará cada vez que se renderice el componente, eso ocurre porque en este caso no tiene dependencias
    useEffect(() => {

        //Funcion servida por firebase que sirve un observador que se ejecutará si el estado del user cambia | Adds an observer for changes to the user's sign-in state | Recibe el auth de firebase creado por nosostros en el archivo de config, así como una funcion aync que recibe el user y comprueba que si el user no existe automaticamente retorna el despacho del logout y se sale de la funcion
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());

            //Si el user existe, desestructuramos las props necesarias
            const { uid, email, displayName, photoURL } = user;
            //Despachamos el login del user, pasando todas las props que deseamos
            dispatch(login({ uid, email, displayName, photoURL }));
            //Hacemos el despacho de neustra función 'startLoadingNotes()' la cual realiza la carga de nuestras notas de firebase a nuestro state
            dispatch(startLoadingNotes());
        })
    }, []);

    //Despues de haberse resuelto el useEffect, retornamos el status, en caso de estar logueado el status valdra 'true', sino 'false'
    return status;
}
import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle, logoutFirebase } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, logout, login } from './';

//Almacenamos en la constante 'checkingAuthentication' una función thunk que se encarga de la tarea asyncrona de checkear las credentials del user
export const checkingAuthentication = () => {
    //Retornamos una función asyncrona que recibe la función que le manda el dispatch al store (en este caso los thunks solo reciben las tareas asyncronas)
    return async (dispatch) => {
        //Despachamos la función 'checkingCredentials()' a nuestro store, esta función ya es síncrona, y es la que coloca el status en checking para bloquear botones, etc 
        dispatch(checkingCredentials());

    }
}

//'start' se suele colocar en el name de la function para indicar que con ella comenzará una tarea asyncrona | Almacenamos en la constante 'startGoogleSignIn' una función thunk que se encarga de la tarea asyncrona de loguear al user mediante su user de google
export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        //Almacenamos en la constante 'result' el resultado tras ejecutar la función singInWithGoogle() la cual nos devuelve un objeto con distintas props
        const result = await singInWithGoogle();
        //Si la prop 'ok' del objeto 'result' está en false como retorno (para que al ejecutar el retorno ya se salga de la función) hacemos el despacho de la función de logout del user (a la que le pasamos la prop errorMessage del objeto 'result')
        if (!result.ok) return dispatch(logout(result.errorMessage));

        //Si sale todo bien, hacemos el despacho de la función de login, a la que le pasamos el objeto 'result' el cual contiene los datos necesarios del user
        dispatch(login(result))

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());
        //Ejecutamos la funcion dada por firebase para registrar un user con email , password y un nombre , almacenamos en la constante 'result' el resultado dado por esta funcion
        const result = await registerUserWithEmailPassword({ email, password, displayName });
        //Si la prop 'ok' del objeto 'result' se ecunetra en false se procede a despachar la funcion de logout a la cual le pasamos por argumento la prop errorMessage del objeto 'result'
        if (!result.ok) return dispatch(logout(result.errorMessage));
        //Si todo sale bien se llama al dispatch y se le pasa la funcion de login a la cual se le pasa por argumento el objeto result
        dispatch(login(result))

    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());
        //Funcion loginWithEmailPassword servida por firebase
        const result = await loginWithEmailPassword({ email, password });

        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));

    }
}

//Almacenamos en la constante starLogout una función que se encarga del deslogueo
export const startLogout = () => {
    //Retornamos una function async la cual recibe un dispatch
    return async (dispatch) => {

        //Hacemos el await para esperar a que se lleve a cabo la ejecución de la funcion logoutFirebase() la cual desloguea al user de la DB firebase
        await logoutFirebase();

        //Hacemos el dispatch de la funcion que vacía nuestro objeto journal, el cual contiene la informacion de las notas del user
        dispatch(clearNotesLogout());

        //Una vez que se desloguea de firebase, despachamos lnuestra función personalizada de logout de nuestra app
        dispatch(logout());

    }
}

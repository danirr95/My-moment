import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

//Este archivo de providers contiene las dstintas funciones ofrecidas por firebase para facilitar al user su autenticación con distintos proveedores como google, github, email y contraseña de nuestra base de datos propia, etc

//Almacenamos en la constante 'googlePProvider' una nueva instancia del proveedor de autenticación de google facilitado por firebase
const googleProvider = new GoogleAuthProvider();

//Almacenamos en la constante singInWithGoogle (y exportamos) una función asyncrona la cual devolverá un objeto (si se resuelve de forma correcta contendrá la info del user, sino detalles sobre el error)
export const singInWithGoogle = async() => {

    //Lo englobamos en un try y catch porque al ser una autenticación puede fallar y debemos poder manejar dicho error
    try {
        //Almacenamos en la constane 'result' el objeto que nos devuelve la funcion signInWithPopup() servida por firebase, la cual recibe la constane que almacena el getAuth de nuestra DB firebase, así como la instancia de GoogleAuthrovider() almacenada en 'googleProvider'
        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        //Desestructuramos de la prop 'user' (del objeto almacenado en la constane 'result') las props displayName, email, photoURL, uid
        const { displayName, email, photoURL, uid } = result.user;
        
        //Retornamos un objeto el cual contiene una prop que utilizamos para comprobar si ha salido todo bien (prop 'ok', si sale bien estará en true), así como todo lo demas obtenido del objeto 'result'
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        

    //En caso de error, entrará en el catch
    } catch (error) {
        
        //Almacenamos en 'errorCode' la prop 'code' del error que recibe nuestro catch
        const errorCode = error.code;
        //Almacenamos en 'errorMessage' la prop 'message' del error que recibe nuestro catch
        const errorMessage = error.message;
    
        //Retornamos un objeto que incluye la prop 'ok' en false ya que la autenticación falló, así como la constante errorMessage
        return {
            ok: false,
            errorMessage,
        }
    }

}

//Almacenamos en la constante registerUserWithEmailPassword (y exportamos) la función asyncrona para registrar un nuevo user, la cual recibe un objeto cuyas props son un email, password y un displayName y devolverá un objeto (si se resuelve de forma correcta contendrá la info del user, sino detalles sobre el error)
export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {
        //Almacenamos en la constante 'resp' el resultado de la función createUserWithEmailAndPassword (funcion dada por firebase, y la cual se encarga de crear un user), recibe el auth creado en nuestro archivo de config de firebase y almacenado en la constante FirebaseAuth, así como el email y el password con el que se registrará el user
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        //Desestructuramos las prop 'uid' y 'photoURL' del objeto 'user' encontrado dentro del objeto 'resp'
        const { uid, photoURL } = resp.user;

        //Ejecutamos la funcion updateProfile dada por firebase, la cual recibe el auth creado por nosotros en el archivo de configuracion de firebase, así como la propiedad a actualizar, en este caso, le añadimos el displayName
        await updateProfile( FirebaseAuth.currentUser, { displayName });

        //Retornamos un objeto cuya prop 'ok' está en true (loque indica que todo salió bien), así como tambien devolvemos el uid que identifica al user, su photoURL, su email y su displayName
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

        //Manejamos el posible error
    } catch (error) {
        //Retornamos un objeto que incluye la prop 'ok' en false ya que la autenticación falló, así como la porp errorMessage que incluye la porp 'message' del objeto que forma el error 
        return { ok: false, errorMessage: error.message }
    }
 
}

export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

//Almacenamos en la constante 'logoutFirebase' una función async que se encarga de desloguear al user
export const logoutFirebase = async() => {
    //Retornamos la ejecucion de la función signOut() llamada por el objeto FirebaseAuth | Dicha función se encarga de cerrar la sesión del usuario
    return await FirebaseAuth.signOut();
}



import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

//Funcion async (que carga nuestras notas desde firebase y las almacena en un nuevo array | Recibe por argumento el 'uid' del user
export const loadNotes = async (uid = '') => {

    if (!uid) throw new Error('El UID del usuario no existe');

    //Obtenemos la referencia  a la coleccion en la que se almacena las notas con la funcion 'collection()' la cual recibe el objeto de config de nuestra db, así como el path del user que conduce a sus notas en firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    //Obtenemos los documentos con la funcion getDocs() de firebase, la cual recibe la referencia de una coleccion en la cual se encuentren los documentos deseados
    //En este caso, docs será un objeto cno todas las notas creadas en firebase
    const docs = await getDocs(collectionRef);

    //Creamos un arreglo en el que iran las notas traídas desde firebase
    const notes = [];
    //Hacemos un foreach de 'docs' objeto que contiene todas las notas creadas en firebase
    docs.forEach(doc => {
        //Por cada 'doc' o nota encontrada, hacemos el push en el array de notas creado, en el cual establecemos la prop 'id' como el 'id' del documento o nota de firebase, y el contenido de dicha nota nos lo devuelve la función data() aplicada a nuestro 'doc' o nota de firebase
        notes.push({ id: doc.id, ...doc.data() });
    });

    //Retornamos el array de notas
    return notes;
}
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote } from './';
import { deleteNoteById, savingNewNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';

//Funcion para crear una nueva nota
export const startNewNote = () => {
    //Retornamos una función async que recibirá del store el dispatch (Dispatches an action. This is the only way to trigger a state change) y la función del store 'getState()' (Returns the current state tree of your application (un objeto). It is equal to the last value returned by the store's reducer)
    return async (dispatch, getState) => {

        //Hacemos el despacho de la funcion 'savingNewNote()', la cual cambiará el valor de la prop 'isSaving' de nuestro state en true, para así deshabilitar el botón de agregar nueva entrada para evitar duplicados en el posteo de la info de la nota
        dispatch(savingNewNote());

        //Desestructuramos del objeto devuelto por la función getState(), y dentro de su prop 'auth', el 'uid' del user de firebase | Esto nos devuelve el 'uid' del usuario  que esté autenticado
        const { uid } = getState().auth;

        //Objeto con los datos necesarios para una nueva nota
        const newNote = {
            title: '',
            body: '',
            //getTime() - Gets the time value in milliseconds.
            date: new Date().getTime(),
        }

        //Almacenamos el documento devuelto por la funcion 'doc()' de firebase | doc() - Gets a DocumentReference instance that refers to a document within reference at the specified relative path. If no path is specified, an automatically-generated unique ID will be used for the returned DocumentReference | A la función doc() le pasamos la referencia de nuestra colección obtenida mediante la función collection() - Gets a CollectionReference instance that refers to the collection at the specified absolute path. Esta función recibe el objeto con nuestra config de firebase, así como el path de la dirección de la colección que deseamos traer, en nuestro caso, indicamos el uid del user con un template string
        //En el caso de que doc() no encuentre una colección en dicho path, crea una nueva
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        //Con la funcion setDoc() escribimos en el documento que le pasemos por referencia
        //Writes to the document referred to by the specified DocumentReference. If the document does not yet exist, it will be created.
        //The result of this write will only be reflected in document reads that occur after the returned promise resolves. If the client is offline, the write fails. If you would like to see local modifications or buffer writes until the client is online, use the full Firestore SDK.
        //setDoc devuelve una promesa, así que debemos ejecutarla con el await
        //Recibe por argumento el documento de referencia (si no existe, lo crea), así como la 'data' que será grabada en el documento (A map of the fields and values for the document)
        await setDoc(newDoc, newNote);

        //Creamos una nueva prop 'id' en nuestro objeto 'newNote', al cual le asignamos el valor del 'id' que le asigne la función doc() al nuevo documento creado (dicho documento corrresponde a nuestra nota una vez que es cargada en firebase)
        newNote.id = newDoc.id;

        //Hacemos el despacho de la función 'addNewEmptyNote()' para poder agregar nuestra nota creada, a dicha función le mandamos como payload nuestra nueva nota creada
        dispatch(addNewEmptyNote(newNote));
        //Hacemos el despacho de nuestra funcion 'setActiveNote()', a la cual le pasamos nuestra nueva nota creada 
        dispatch(setActiveNote(newNote));

    }
}

//Función que carga nuestras notas de firebase a nuestro state
export const startLoadingNotes = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        //Almacenamos en 'notes' el array de notas devuelto por la funcion asincrona 'loadNotas' la cual recibe el 'uid' del user
        const notes = await loadNotes(uid);
        //Hacemos el dispatch de la función setNotes, la cual setea las notas en nuestro state. Dicha función recibe el array de notas
        dispatch(setNotes(notes));
    }
}

//Thunk que se encarga de guardar una nota en firebase
export const startSaveNote = () => {

    return async (dispatch, getState) => {

        //Hacemos el dispatch de setSaving(), la cual se encarga de establecer la prop isSaving de nustro state en 'true'
        dispatch(setSaving());

        const { uid } = getState().auth;
        //Desestructuramos de nuestro state la prop 'journal' (gracias a la funcion getState()) la prop 'active', la cual le damos el alias de 'note'
        const { active: note } = getState().journal;

        //Almacenamos en la constante 'noteToFireStore' todo el contenido esparcido de nuestra nota (la que vaya a ser actualizada)
        const noteToFireStore = { ...note };
        //Eliminamos una prop de un objeto de js con 'delete', en este caso, eliminamos la prop 'id' de nuestro objeto que contiene la nota esparcida, ya que dicho 'id' ya lo tiene firebase
        delete noteToFireStore.id;

        //Obtenemos la referencia al documento de la nota que deseamos actualizar con la función doc(), la cual recibe nuestro objeto de config de firebase y el path de la nota que deseamos actualizar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        //Seteamos el nuevo documento (la nota actualizada) gracias a la funcion setDoc() la cual recibe la referencia de nuestro documento (la nota en firebase), así como el contenido que deseamos mandar, y en este caso, un objeto con options, donde indicamos que la prop 'merge' está en true, esto hace que si ya existian en la nota anterior algunos campos, y en este nueva actualizacion no se sobreescriben esos campos o no se mandan, que se conserven tal y como estaban
        await setDoc(docRef, noteToFireStore, { merge: true });

        //Hacemos el dispatch del thunk que actualiza nuestra nota, el cual actualiza la nota en nuestro state
        dispatch(updateNote(note));

    }
}

//Funcion encargada de ejecutar la subida de imágenes a Cloudinary
//Recibimos por argumento un array con todos los archivos subidos por el usuario
export const startUploadingFiles = (files = []) => {

    return async (dispatch) => {
        //Hacemos el dispatch de la funcion que se encarga de establecer nuestra prop isSaving del state en true
        dispatch(setSaving());

        //Array de promesas, cada imagen que se esté subiendo será una nueva promesa
        const fileUploadPromises = [];
        //Recorremos el array de archivos subido por el user, y obtenemos cada file de forma individual
        for (const file of files) {
            //Primero llamamos a la función 'fileUpload()' la cual recibe el archivo y realiza la subida | Esto devuelve una promesa, la cual es pusheada al array antes creado
            fileUploadPromises.push(fileUpload(file))
        }

        //En una constante almacenamos el resultado (las secure_url) de todas las promesas del array 'fileUploadPromises'
        //El metodo all() ejecuta todas las promesas que recibe en un array de promesas y devuelve otro array con los datos de las promesas realizadas | Se detiene cuando todas las promesas se resuelven o cuando alguna de ellas falle
        const photosUrls = await Promise.all(fileUploadPromises);

        //Hacemos el dispatch de la funcion que se encarga de guardar las fotos (que han sido subidas en cloudinary) en nuestro state
        dispatch(setPhotosToActiveNote(photosUrls));

    }
}

//Funcion para borrar una nota
export const startDeletingNote = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        //Desestructuramos de nuestro state la prop 'journal' (gracias a la funcion getState()) la prop 'active', la cual le damos el alias de 'note'
        const { active: note } = getState().journal;

        //Obtenemos la referencia al documento de la nota que deseamos eliminar con la función doc(), la cual recibe nuestro objeto de config de firebase y el path de la nota que deseamos eliminar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        //Eliminamos el documento (la nota) gracias a la funcion deleteDoc() la cual recibe la referencia de nuestro documento (la nota en firebase)

        //Hacemos el dispatch de la funcion que elimina la nota de nuestro state, la cual recibe el id de la nota
        dispatch(deleteNoteById(note.id));

    }
}
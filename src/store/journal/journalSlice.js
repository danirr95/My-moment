import { createSlice } from '@reduxjs/toolkit';
import { startSaveNote } from './thunks';

//Almacenamos en una constante 'journalSlice' el Slice que creamos. Un Slice is a function that accepts an initial state | an object full of reducer functions | and a "slice name" | and automatically generates action creators and action types that correspond to the reducers and state.
export const journalSlice = createSlice({
    name: 'journal',
    //Initial state object
    initialState: {
        //Prop que indica si la nota se está guardando, así podemos detectar si se está guardando y evitar un doble posteo de la info 
        isSaving: false,
        //Mensaje de guardado
        messageSaved: '',
        //Arreglo de notas
        notes: [],
        //Prop que indica si la nota está activa o si ha sido completada
        active: null,
    },
    //Objeto que contiene los distintos reducers para solventar las distintas actions que deseemos | Cada reducer es colocado como una propiedad (que a su vez será un objeto) | Los reducers son funciones SÍNCRONAS, FUNCIONES PURAS, el trabajo asíncrono se realiza en los thunks
    reducers: {
        //Cada reducer creado y colocado como propiedad del objeto reducers, no es mas que una función pura que obtiene el state y hace alguna modificación sobre este
        //En este reducer 'savingNewNote'| Esta función establece la prop 'isSaving' en true
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        //En este reducer 'addNewEmptyNote' recibimos nuestro objeto state para modificarlo, así como la action que dispará este 'addNewEmptyNote'
        addNewEmptyNote: (state, action) => {
            //Añadimos al array de notas de nuestro state la nueva nota recibida en el payload de la action que invoca este reducer
            state.notes.push(action.payload);
            //Establece la prop 'isSaving' en false
            state.isSaving = false;
        },
        //En este reducer, recibimos la nota nueva creada, así como recibe nuestro state para modificarlo
        setActiveNote: (state, action) => {
            //Establecemos que la prop 'active' como nota activa de nuestro state, va a ser la nota que recibamos como payload de la action
            state.active = action.payload;
            //Establecemos el mensaje de guardado como un string vacío para que deje de aparecer el mensaje de nota actualizada si es que la actualizamos
            state.messageSaved = '';
        },
        //En este reducer seteamos las notas en nuestro arreglo de notas 
        setNotes: (state, action) => {
            //Indicamos que la prop 'notes' (arreglo de notas) de nuestro state, tendrá el valor del array de notas recibido como payload
            state.notes = action.payload;
        },
        //En este reducer modificaremos la prop 'isSaving' en true
        setSaving: (state) => {
            state.isSaving = true;
            //Establecemos el mensaje de guardado como un string vacío para que deje de aparecer el mensaje de nota actualizada si es que la actualizamos
            state.messageSaved = '';
        },
        //Este reducer se encarga de actualizar una nota, la cual será buscada de entre nuestras notas en el array de notas de neustro state
        updateNote: (state, action) => {
            //Establecemos la prop 'isSaving' de nuestro state en 'false'
            state.isSaving = false;
            //Mapeamos todas las notas del array de notas
            state.notes = state.notes.map(note => {
                //Si el id de la nota que estamos mapeando es igual al id de la nota que recibimos en el payload
                if (note.id === action.payload.id) {
                    //Retornamos la nota contenida en el payload
                    return action.payload;
                }

                //Si no, retornamos la nota mapeada
                return note;
            });

            //Establecemos en la prop 'messageSaved' del state una expresión
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        },
        //Reducer que coloca en nuestra nota las fotos subidas a cloudinary 
        setPhotosToActiveNote: (state, action) => {

            //En el caso de que creemos una nota nueva y solo añadamos imágenes y no texto, debemos detectar que la prop 'imageUrls' (un array) estará vacía, así que deberemos darle un valor por defecto en este caso
            if (!state.active.imageUrls) state.active.imageUrls = [];
            //En el caso de que la nota ya esté creada, simplemente se esparcen las imagenes que ya hubiera en el array 'imageUrls' junto con las imagenes recibidas en el array de imagenes de la payload
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            //Establecemos la prop 'isSaving' en false para que la app ya no esté bloqueada (los botones estarían desabilitados)
            state.isSaving = false;
        },

        //Este reducer vacía el state (coloca todas sus props en sus valores por defecto)
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        //Este reducer elimina una nota de nuestro state
        deleteNoteById: (state, action) => {
            //Establecemos la prop active del state en null
            state.active = null;
            //Actualizamos el array de notas de nuestro state, ingresando dentro de él todas las notas (pasadas por un filter para eliminar la nota deseada) menos la nota a eliminar, la cual será aquella cuyo 'id' coincida con el 'id' recibido como payload en nuestra función reducer
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
    }
});


// Action creators are generated for each case reducer function
// Action creators for the types of actions that are handled by the slice reducer | Exportamos las actions creadas, dichas actions se almacenan en la propiedad actions del objeto journalSlice (que no es mas que es slice que hemos creado arriba)
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;
import { useEffect, useMemo, useState } from 'react';

//Nuestro custom hook para manejar formularios, recibe por argumento un objeto formado por los datos del formulario
export const useForm = (initialForm = {}, formValidations = {}) => {
    
    //Creamos el useState según el objeto de formulario que se le pase al customHook por argumento
    const [formState, setFormState] = useState(initialForm);
    //Usamos un useState para almacenar las props del form una vez que son pasadas por el validador
    const [ formValidation, setFormValidation ] = useState({});

    //Usamos un useEffect que se ejecutará cada vez que cambie el valor del formState (cada vez que el user envie nuevos datos mediante le formulario)
    useEffect(() => {
        //Al ejecutarse este useEffect, se ejecutará la funcion que hemos creado de createValidators(), la cual valida todos los datos del form y devuelve un objeto con las prop en null (eso querrá decir que todas las props son correctas) o con el contenido del errorMessage
        createValidators();
    }, [ formState ])

    //Este useEffect hará que se ejecute el setter de nuestro initialForm (el state de nuestro formulario) cada vez que sea modificado dicho initialForm (en este caso, cada vez que sea modificada algunas de las props de nuestra nota)
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])

    //Almacenamos en la constane 'isFormValid' (que será un objeto) el valor de cada prop del objeto formValidation devuelta mediante el proceso de recorrer las keys de dicho objeto y comprobar si dicha prop es exactamente distinta de null, en cuyo caso devolverá false
    const isFormValid = useMemo( () => {
        //Recorremos cada llave del objeto formValidation
        for (const formValue of Object.keys( formValidation )) {
            //Por cada prop recorrida realizamos la comprobacion de que si dicha prop es exactamente diferente a null devoolverá false
            if ( formValidation[formValue] !== null ) return false;
        }
        //Si todas las prop resultan en null, devolvemos true
        return true;
    }, [ formValidation ])

    //Funcion para cambiar el valor del stateForm desde fuera (hace como setter)
    //Recibe el evento en bruto desde el elemento que lo invoca, en este caso, un input. Desestructuramos el target de dicho evento
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        //Invocamos el modificador del contenido del formState, le decimos que deje todos los valores como estaban (con el operador spread) y que añada un anueva propiedad cuyo nombre será el 'name' (propiedad 'name') del elemento que invoca a la función onInputChange, y le introduzca el value proveniente del evento recibido desde el input
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //Funcion que devuelve el form a su estado original tras pulsar el boton de reset
    const onResetForm = () => {
        setFormState(initialForm);
    }

    //Funcion que crea un objeto con los valores de las prop del formulario validadas
    const createValidators = () => {
        //Objeto que contendrá los valores del formulario validados 
        const formCheckedValues = {};
        
        //Recorremos cada prop del objeto 'formValidations' 
        for (const formField of Object.keys( formValidations )) {
            //Cada propiedad es en sí un array, de dicho array extraemos la funcion de validacion (primer elemento del array) y el mensaje de error (segundo elemento del array)
            const [ fn, errorMessage ] = formValidations[formField];

            //Establecemos en el objeto formCheckedValues nuevas props, las cuales cada una de ellas tiene como nombre el mismo nombre de la prop extraida del formValidations añadiendole el string 'valid' y le estableces como contenido, en funcion de si la funcion de comprobacion devuelve null o el mensaje de error
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }
        //Llamamos al setter del formValidation y le pasamos el objeto creado por nosotros el cual contiene los valores del form validados
        setFormValidation( formCheckedValues );
    }

    //Retornamos todos los datos que tuviera el form de forma original, así como los nuevos datos, la función del inputChange que agrega datos al state del formulario, y la funcion ResetForm que limpia y resetea el formulario
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    //Exportamos todas las prop esparciadas (gracias al operador spread) del objeto formValidation, así como el objeto isFormValid
        ...formValidation,
        isFormValid
    }

}

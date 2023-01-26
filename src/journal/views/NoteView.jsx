import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";

//Componente que da forma a la vista completa de una nota
export const NoteView = () => {
  //Obtenemos el dispatch para despachar actions a nuestro journalSlice
  const dispatch = useDispatch();
  //Desestructuramos las props necesarias de nuestro state gracias al useSelector() el cual recibe el state y nos devuelve la prop 'journal' de dicho state
  const {
    //la prop 'active' ahora se llamara 'note'
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  //Desestructuramos las props necesarias de nuestro useForm(), a dicho useForm le pasamos la note que desestructuramos de nuestro state
  const { body, title, date, onInputChange, formState } = useForm(note);

  //Almacenamos el dato de la fecha memorizado, el cual se volverá a memorizar cada vez que dicho valor de fecha cambie
  const dateString = useMemo(() => {
    //Creamos una nueva fecha
    const newDate = new Date(date);
    //Retornamos dicha fecha formateada con el método 'toUTCString()'
    return newDate.toUTCString();
  }, [date]);

  //useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component
  //Gracias a este useRef() obtenemos la referencia html del elemento que lo invoque
  const fileInputRef = useRef();

  //Usamos un useEffect para dispara el dispatch de la funcion que se encarga de settear la nota que estará activa
  useEffect(() => {
    //Dicha funcion recibe el formState que haya sido modificado
    dispatch(setActiveNote(formState));
    //y se disparará cada vez que dicho formState (cualequiera de sus props) sea modificado
  }, [formState]);

  //Usamos un useEffect para disparar nuestro mensaje de seewt alert cada vez que se actualice la prop 'messageSaved'
  useEffect(() => {
    //Si el length de messageSaved es mayor que 0 quiere decir que se actualizó la nota y por tanto, se modifico la prop 'messageSaved'
    if (messageSaved.length > 0) {
      //Disparamos el sweet alert con el mensaje que le indicamos "Nota actualizada", así como el mensaje de guardado junto a un icono de 'success'
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  //Funcion que ejecuta el dispatch de la funcion startSaveNote() la cual realiza la actualización de nuestra nota en firebase
  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  //Funcion que ejecuta el dispatch de la funcion que subiralas imagenes que indique el user
  //Recibimos el target desestructurado del evento que recibe la funcion
  const onFileInputChange = ({ target }) => {
    //Si la prop 'files' del target esta en 0, es porque el user cancelo la subida de archivos, si eso sucede, haremos el return para salirnos de la funcion
    if (target.files === 0) return;
    //Si todo va bien, hacemos el dispatch de la funcion encargada de la subida de las imagenes, la cual recibe por argumento el objeto 'files' con las imagenes a subir
    dispatch(startUploadingFiles(target.files));
  };

  //Funcion para borrar una nota
  const onDelete = () => {
    //Hacemos el dispatch de la funcion que se encargará de la eliminacion de la nota activa
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        {/* input de type file para recibir las imagenes a subir */}
        <input
          type="file"
          //Con la prop 'multiple' hacemos que este input pueda aceptar multiples archivos a la vez
          multiple
          //Como prop 'ref' pasamos el objeto que nos devuelve nuestro useRef, el cual a partir de ahora, almacenará la referencia a nuestro input de type file
          ref={fileInputRef}
          //Cuando sufra alguna modificacion, llama a la funcion 'onFileInputChange'
          onChange={onFileInputChange}
          //Con el display en none hacemos que visualmente no se vea en la pantalla para el user
          style={{ display: "none" }}
        />

        {/* Boton que hace referencia a nuestro input para la subida de imagenes */}
        <IconButton
          color="primary"
          //Desactivado segun el valor de la variable 'isSaving'
          disabled={isSaving}
          //Cuando sea clickado, se ejecutará una callback, la cual no recibe nada por argumento y retorna la funcion click() encontrada en la prop 'current', encontrada a su vez dentro del objeto 'fileInputRef' | Esto hace que al clickar en nuestro icono 'UploadOutlined' se ejecute el input de tipo file declarado mas arriba
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        {/*Componente Button importado de Material UI*/}
        <Button
          //Estará desactivado según el valor de la variable 'isSaving'
          disabled={isSaving}
          onClick={onSaveNote}
          //color 'primary' obtenido de nuestro theme creado
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined
            //Icono SaveOutlined importado de Material UI
            sx={{ fontSize: 30, mr: 1 }}
          />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          //Componente TextField importado de Material UI props -> type="text" igual que los input | variant es la variante del textfield a usar, (puede ser 'filled', 'outlined' o 'standard') | fullwidth para que ocupe todo el ancho disponible (the input will take up the full width of its container) | como styles xtra el border en 'none'
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          //El name que identificará dicho TextField
          name="title"
          //The value of the input element, required for a controlled component
          value={title}
          //The value of the input element, required for a controlled component
          onChange={onInputChange}
        />

        <TextField
          //En este TextField indicamos como prop la prop multiline (if true, a textarea element is rendered instead of an input) esto hace que en lugar de ser un simple imput, se comporte como un textarea | con minRows le indicamos que ocupe como mínimo 5 filas del total de 12 que le ofrece el grid que hace de componente padre
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      {/* contenedor (como un div) cuyo contenido está pegado a la derecha */}
      <Grid container justifyContent="end">
        {/* boton para borrar la nota */}
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          {/* Icono de material ui */}
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Componente Image gallery que hemos creado | Le mandamos como prop 'images' el array de imagenes que encontramos en nuestra nota desestructurada desde el state*/}
      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};

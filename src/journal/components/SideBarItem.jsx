import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { setActiveNote } from "../../store/journal";

//Componente que recibe los datos de una nota, así como un array de imagenes que corresponden a dicha nota
export const SideBarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
  //Obtenemos la referencia al dispatch para despachar actions a nuestro 'journalSlice'
  const dispatch = useDispatch();

  //Funcion ejecutada al clickar una nota del 'SideBarItem'
  const onClickNote = () => {
    //Al ser clickada, se hará el dispatch de la funcion 'setActiveNote' la cual recibe los datos de la nota y establece esa nota como 'activa' lo cual hace que ésta se muestre al completo
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  //Almacenaremos el titulo de la nota modificado si es muy largo o tal y como está si no es demasiado largo
  //Con el useMemo memorizaremos su valor, y este será memorizado de nuevo cada vez que dicho title sea modificado
  const newTitle = useMemo(() => {
    //Retornamos el título cortado desde su posicion 
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  {
    /*Creamos un ListItem de material ui al cual le indicamos la propiedad 'disablePadding' para eliminar cualquier padding que pudiera haber dentro del ListItem*/
  }
  return (
    <ListItem disablePadding>
      {/* Dentro tenemos un ListItemButton de material ui que permite que todo lo que se coloque en su interior sea clickable , como prop onClick pasamos la referencia a nuestra función 'onClickNote' la cual vuelve activa la nota pulsada, loo que hará que dicha nota se muestre al completo*/}
      <ListItemButton onClick={onClickNote}>
        {/*Dentro tenemos un ListItemIcon que será el contenedor para el icono que represente a este ListItem*/}
        <ListItemIcon>
          {/*En este caso, el icono que represente a todos los listItem será el icono TurnedInNot importado de Material UI*/}
          <TurnedInNot />
        </ListItemIcon>
        {/*Colocamos un grid que será el contenedor para la información que estará junto al icono del ListItem*/}
        <Grid container>
          {/*ListItemText que es el contenedor que contiene el texto que contendrá el ListItem, como propiedad 'primary' colocamos el título de la nota, dentro de 'primary' se indica el contenido (en este caso una variable) que será el encabezado de dicho texto*/}
          <ListItemText primary={newTitle} />
          {/*En este caso indicamos la prop 'secondary', que será el texto 'secundario' , en este caso será el body de la nota*/}
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

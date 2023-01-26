import { useDispatch, useSelector } from "react-redux";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { NoteView } from "../views/NoteView";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { startNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {
  //Almacenamos la función para poder realizar el dispatch
  const dispatch = useDispatch();
  //Desestructuramos las props 'isSaving' y 'active' de nuestro state gracias a la funcion useSelector() (A hook to access the redux store's state. This hook takes a selector function as an argument. The selector is called with the store state) | Esta función reicbe el state y nos devolverá la prop 'journal' de nuestro state, de la cual desestructuramos los valores deseados
  const { isSaving, active } = useSelector((state) => state.journal);

  //Función que ejecuta el despachado de nuestra función para crear una nueva nota
  const onClickNewNote = () => {
    dispatch(startNewNote());
  };
  //
  return (
    <JournalLayout>
      {/* 'active será un objeto, y con !!active lo transformamos en un valor booleano
      Según su valor, renderizamos el componente con la vista de la nota o no */}
      {!!active ? <NoteView /> : <NothingSelectedView />}
      {/* Botón flotante (IconButton) importado de Material UI, props ->  */}
      <IconButton
        //Al clickar pasamos la referencia a la función que añade una nueva nota
        onClick={onClickNewNote}
        size="large"
        //El botón estará desactivado si la prop 'isSaving' está en true, lo que significa que habrá una nota que se está guardando
        disabled={isSaving}
        sx={{
          color: "white",
          backgroundColor: "error.main",
          //':hover' lo utilizamos para indicar los estilos cuando se hace hover sobre el elemento, en este caso le aplicamos el mismo background color que ya tiene y una opacidad de 0.6
          ":hover": { backgroundColor: "error.main", opacity: 0.5 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        {/* Icono AddOutlined importado de Material UI al que le indicamos un fontSize (con esta propiedad modificamos el tamaño del icono) de 30 (cuando no se indica la unidad e medida significa px) */}
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

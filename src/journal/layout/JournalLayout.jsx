import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar, SideBar } from "../components";

//Tamaño específico que tendrán el navbar y el sidebar
const drawerWidth = 240;

//JournalLayout que recibe sus hijos por argumento
export const JournalLayout = ({ children }) => {
  //Colocamos como elemento padre un 'Box' que es algo así como un 'div'
  //Este box indicamos que en pantallas pequeñas tenga el display de 'flex'
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* NavBar al que le pasamos una propiedad creada por nosotros 'drawerWidth' cuyo valor es la constante creada drawerWidth = 240*/}
      <NavBar drawerWidth={drawerWidth} />

      {/* SideBar al que le pasamos una propiedad creada por nosotros 'drawerWidth' cuyo valor es la constante creada drawerWidth = 240*/}
      <SideBar drawerWidth={drawerWidth} />

      {/* Dentro creamos un box hijo el cual le indicamos que represente a un componente main, es lago así como crear una etiqueta <main></main> . Indicamos como styles xtra que tenga un flex-grow (que es la cantidad de columnas que va a ocupar dicho elemento, en este caso 3 de 12) | Padding de 3*/}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

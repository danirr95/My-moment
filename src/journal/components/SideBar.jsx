import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./";

//El componente SideBar recibe por argumento la proppiedad drawerWidth con valor predeterminado de 240
export const SideBar = ({ drawerWidth = 240 }) => {
  //Extraemos el 'displayName' del store gracias a nuestro useSelector() | This hook (el useSelector()) takes a selector function as an argument. The selector is called with the store state | A dicho useSelector le pasamos el state del store al completo y le indicamos que solo deseamos el slice llamado 'auth' el cual contiene las prop deseadas
  const { displayName } = useSelector((state) => state.auth);
  //Desestrucutramos nuestro array de notas desde el state gracias al useSlector, el cual recibe le state y nos devuelve la prop 'journal' del state
  const { notes } = useSelector((state) => state.journal);

  return (
    <Box
      //Componente Box importado de MAterial UI, con component 'nav' le indicamos que hará las funciones de un nav
      //Con styles xtra le indicamos que como ancho tenga, en pantallas sm la cantidad indicada en la prop drawerWidth (si no indicamos unidad de medida, por defecto la coloca en px) | y un flexShrink (propiedad que indica la contracción que el elemento hará para adaptar su contenido al ancho disponible en el padre del elemento al que le apliquemos la aprop flexShrink, en este caso al ser 0 no se aplicará contracción, a mayor número mayor contracción permitirá)
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Componente drawer importado de material ui -> Navigation drawers provide access to destinations in your app | variant='permanent' indica que será permanente y wl drawer no se podrá abrir y cerrar*/}
      <Drawer
        variant="permanent" // temporary
        //open indica que estará siempre abierto el drawer | open sin nada es igual que open={true} que indica que siempre estará abierto
        open
        //Como styles xtra indicamos un display (en pantallas xs) de block para que el drawer tenga un comportamineto de bloque
        //Con '& .MuiDrawer-paper' indicamos que deseamos añadir a los estilos que ya trae de forma predeterminada el componente Paper (Styles applied to the Paper component) -> le indicamos un boxSizing 'border-box', el valor border-box en el box-sizing hace que el padding y el border pasen a formar parte del cálculo del ancho de la caja y no lo suman posteriormente | tambien indicamos un ancho del tamaño de la prop drawerWidth
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        {/* Componente Divider importado de Material UI */}
        <Divider />
        {/* Component List importado de Material UI para generar una lista | Mapeamos el array de notes desestructurado desde el state*/}
        <List>
          {notes.map((note) => (
            //Por cada nota iterada, creamos un componente SideBarItem, el cual lo identificamos con una key unica que será el 'id' de cada nota, y a su vez, le pasamos todo el resto del contenido de la nota esparcido con el operdaor spread
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

//OTRA FORMA DE DIBUJAR LA LISTA

//<List>
/* Con los corchetes colocamos una expresión de cálculo, dentro de la cual colocamos un array de prueba el que mapeamos y por cada uno de ellos, creamos un ListItem de material ui el cual recibe una key única que será en este caso el mismo valor del texto que mapeamos (le indicamos tambien la propiedad disablePadding para eliminar cualquier padding que pudiera haber dentro del ListItem)*/

//          {notes.map((text) => (
//            <ListItem key={text} disablePadding>

/* Dentro tenemos un ListItemButton de material ui que permite que todo lo que se coloque en su interior sea clickable */

//              <ListItemButton>
{
  /* Dentro tenemos un ListItemIcon que será el contenedor para el icono que represente a este ListItem */
}
//                <ListItemIcon>
{
  /* En este caso, el icono que represente a todos los listItem será el icono TurnedInNot importado de Material UI */
}
//                  <TurnedInNot />
//                </ListItemIcon>

{
  /* Colocamos un grid que será el contenedor para la información que estará junto al icono del ListItem */
}
//                <Grid container>
{
  /* ListItemText que es el contenedor que contiene el texto que contendrá el ListItem, como propiedad primary colocamos la variable que estamos mapeando, dentro de primary se indica el contenido (en este caso una variable) que será el encabezado de dicho texto */
}
//                  <ListItemText primary={text} />
{
  /* En este caso indicamos la prop secondary, que será el texto 'secundario' , en este caso actúa como texto de relleno */
}
//                  <ListItemText
//                    secondary={"Exercitation cillum irure elit consectetur."}
//                  />
//                </Grid>
//              </ListItemButton>
//            </ListItem>
//          ))}
//  </List>

import { useDispatch } from "react-redux";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { startLogout } from "../../store/auth";

//El componente Navbar recibe por argumento la proppiedad drawerWidth con valor predeterminado de 240
export const NavBar = ({ drawerWidth = 240 }) => {
  //Almacenamos en la cosntante 'dispatch' la funcion utilizada para despachar actions hacia nuestro store
  const dispatch = useDispatch();

  //Funcion que realiza el dispatch de nuestro 'thunk' (función asíncrona) de deslogueo
  const onLogout = () => {
    dispatch(startLogout());
  };

  //Importamos el componente AppBar de Material UI al que le indicamos una position fixed
  return (
    <AppBar
      position="fixed"
      //Como styles xtra indicamos que como ancho en pantallas 'sm' coloque el cálculo de restarle al 100% disponible - el valor en pixeles de la propiedad 'drawerWidth'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        //como margin-left, le indicamos que en pantallas super small coloque el valor en pixeles de la propiedad 'drawerWidth'
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      {/* Componente ToolBar importado de Material UI */}
      <Toolbar>
        {/* Componente IconButton (engloba un icono y hace que dicho icono pueda ser pulsado) importado de Material UI al que le colocamos las propiedades -> color 'inherit' para que lo herede de nuestro theme creado | edge 'start' que es utilizado para contrarrestra el margen que se le imponga con un margen negativo para ser colocado donde lo necesitemos, en este caso, le indicamos que se coloque en el principio (parte izquierda) con start | como styles xtra le indicamos que tenga un margin-right de 2 y un display none en pantallas sm para que dicho icono solo se vea en pantallas xs*/}
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          {/* Icono de menu importado de Material UI */}
          <MenuOutlined />
        </IconButton>

        {/* Grid container al que le indicamos propiedades -> direction 'row' para que sus elementos hijos esten organizados en una fila | justify-content para alineacion horizontal en 'space-between' | align-items para alineacion vertical en 'center' */}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Componente de texto 'Typography' que representa un elemento h6 | propiedad noWrap para que el texto no se divida y salte de línea | component 'div' para que se le reconozca como a un elemento 'div' */}
          <Typography variant="h6" noWrap component="div">
            My moment
          </Typography>

          {/* Componente IconButton (engloba un icono y hace que dicho icono pueda ser pulsado) importado de Material UI al que le colocamos las propiedades -> color 'error' es el color que nossotros hemos indicado en nuestro theme creado en purpleTheme.js | Como propiedad onClick le pasamos la referencia de la funcion 'onLogout' */}
          <IconButton color="error" onClick={onLogout}>
            {/* Icono de menu importado de Material UI */}
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

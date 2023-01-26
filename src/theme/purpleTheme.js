import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

//Almacenamos en la constante purpleTheme nuestro objeto de js que contiene un tema que crearemos con la funcion createTheme, la cual recibe por argumento el objeto con las propiedades deseadas para nuestro tema
export const purpleTheme = createTheme({
    //Propiedad palette para la paleta de colores
    palette: {
        //Paleta de colores primaria
        primary: {
            //Color principal de nuestra paleta de colores primaria
            main: '#262254'
        },
        //Paleta de colores secundarias para los elementos de nuestra app
        secondary: {
            main: '#543884'
        },
        //Color que adoptará nuestro tema en caso de error en alguna parte de nuestra app
        error: {
            main: red.A400
        }
    }

})
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme } from "./purpleTheme";
//Nuestro componente AppTheme provee de un tema que hayamos creado (almacenado en 'theme') a todos sus children, los cuales recibe por argumento
//Retorna un ThemeProvider que es quien provee del tema a sus componentes hijos
export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      {/* El componente CssBaseline se encarga de hacer que nuestra aplicacion se vea muy parecida en los distintos navegadores, este componente lo trae material ui por defecto */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

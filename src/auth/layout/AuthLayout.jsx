import { Grid, Typography } from "@mui/material";

//Componente con el que reutilizaremos la parte de código que es igual para el login y el registrer
//Recibe por argumento a sus children, ya que hace de high-order component ya que hará de padre de los componentes LognPage y RegistrerPage
//Recibe tambien por argumento el title que sera un string que le dará nombre a la Typography que contiene este componente, será login en el caso de loginPage, por ejemplo
export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      //Grid container con propiedades -> spacing (espacio entre sus elementos hijos) de 0 | direction 'column' para que sus elementos hijos estén colocados en columnas | alignItems 'center' para alinear en el eje vertical todos sus elementos hijos centradamente | justifyContent 'center' para colocar en el eje horizontal todos sus elementos centradamente | sx para xtra styles -> minHeight '100vh' para que tenga un mímo de alto del 100% de la altura del viewport | background color 'primary.main' que lo toma de nuestro theme predefinido 'prupleTheme.js' | padding 4 para que haya un padding de 4 entre todo sus elementos hijos
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        //Grid item al que le aplicamos una clase creada por nosotros, la cual le añade un box-shadow | Le indicamos que en pantallas extra-small tenga un tamaño de 3 columnas | Como styles xtra le indicamos -> con width indicamos el ancho en pixeles que deseamos que tenga el elemento, en este caso, indicamos que a partir de pantallas sm en adelante tenga un ancho de 450px | backgroundColor en 'white' | un padding de 3 | borderRadius de 2
        className="box-shadow"
        xs={3}
        sx={{
          width: { sm: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          //Typography de tipo (variante) h5 | Como styles xtra indicamos un margin-bottom de 1
          variant="h5"
          textAlign='center'
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>

        {/* Aquí se colocaría el código de cada hijo en cuestión que llame a este componente padre AuthLayout */}
        {children}
      </Grid>
    </Grid>
  );
};

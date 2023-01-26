import { Grid, Typography } from "@mui/material";
import { StarOutline } from "@mui/icons-material";

export const NothingSelectedView = () => {
  return (
    <Grid
      //Grid container propiedades -> spacing (Defines the space between the type item components) en 0 | direction para la direccion de sus elementos hijos en 'column' | alignItems para la alineacion vertical de sus elementos hijos en 'center' | justifyContent para la alineacion horizontal de sus elementos en 'center' | styles xtra de minHeight con valor de 88 por ciento del maximo de la altura del viewport | backgroundColor obtenido del objeto del theme que hemos creado, el color 'main' o principal de la paleta de colores primarios | borderRadius de 3
      className="animate__animated animate__fadeIn animate__faster"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(95vh - 100px)",
        backgroundColor: "primary.main",
        borderRadius: 3,
      }}
    >
      <Grid
        //Grid item hijo que en pantallas xs ocupa todo el ancho disponible (12 de 12)
        item
        xs={12}
      >
        <StarOutline
          //Icono StarOutline importado de Material UI al que le indicamos como styles xtra que tenga un fontSize de 100 (si no se indica unidad serán pixeles) | color 'white'
          sx={{ fontSize: 100, color: "white" }}
        />
      </Grid>
      <Grid
        //Grid item hijo que en pantallas xs ocupa todo el ancho disponible (12 de 12)
        item
        xs={12}
      >
        <Typography
          //Componente Typography de Material UI props -> color 'white' | variant, será interpretadao como un h5 | como styles xtra tiene textAlign 'center' para que el texto de su interior esté centrado | p de padding en 1
          color="white"
          variant="h5"
          sx={{ textAlign: "center", p: 1 }}
        >
          Selecciona o crea una entrada
        </Typography>
      </Grid>
    </Grid>
  );
};

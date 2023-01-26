import { CircularProgress, Grid } from "@mui/material";

//Componente que será renderizado mientras el status se encuentre en valor 'checking' | Dicho componente está formado por un grid container y un grid item (el cual contiene el elemnto de progreso circular)
export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid container direction="row" justifyContent="center">
        {/* Componente importado de material ui | prop color puede ser "warning" | "primary" | "secondary" | "error" | "info" | "success" | "inherit" */}
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};

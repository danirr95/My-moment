import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";
//Componente principal de nuestra aplicacion, que al ser llamado dirige al user a nuestro router principal que es AppRouter
export const JournalApp = () => {
  //Envolvemos todo nuestro componente principal de la aplicacion con el componente proveedor del tema que hemos crado
  return (
    <AppTheme>
      {/* Al ejecutarse nuestro componente JournalApp, este dirige al user a nuestro Router principal AppRouter */}
      <AppRouter />
    </AppTheme>
  );
};

import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks";

//AppRouter es el router principal de nuestra aplicacion, es como el routes padre de todos los demas routes
export const AppRouter = () => {
  //Almacenamos en la constante 'status' el status retornado despues de ejecutar nuestro custom hook useCheckAuth() , dicha funcion se ejecutará cada vez que se inicie nuestra aplicacion (ya que nos encontramos en nuestro router principal)
  const status = useCheckAuth();

  //Si el status es checking, ejecutamos el componente de loading
  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {/* Colocamos entre corchetes porque es una expresión de cálculo, o ente caso, de comprobación | comprobamos si status está en authenticated, eso querrá decir que el user ha sido logueado de forma corecta, con lo cual le permititmos el acceso a todas las rutas de nuestra aplicación */}
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      {/* En caso contrario (status valdrá not-authenticated), solo permitimos el acceso a la ruta de login para loguearse o registrarse */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />

      {/* Aqui se dirigen todas las rutas que empiecen por auth/, dichas rutas son direccionadas a nuestro componente AuthRoutes */}
      {/*<Route path="/auth/*" element={<AuthRoutes />} />*/}
      {/* Aqui se dirigen todas las demas rutas, dichas rutas son dirigidas a nuestro componente JournalRoutes */}
      {/*<Route path="/*" element={<JournalRoutes />} />*/}
    </Routes>
  );
};

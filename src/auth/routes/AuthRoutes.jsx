import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegistrerPage } from "../pages";

//Componente que maneja las rutas de autenticación, ya sea que el user se quiera loguear o se quiera registrar
export const AuthRoutes = () => {

  return (
    <Routes>
      {/* Dependiendo de si el user desea loguearse o registrarse, se le direccionará al componente LoginPage o a RegistrerPage */}
      <Route path="login" element={<LoginPage />} />
      <Route path="registrer" element={<RegistrerPage />} />

      {/* Cualquier otra ruta será diriga a la ruta /auth/login */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

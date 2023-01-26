import { Navigate, Route, Routes } from "react-router-dom";
import { JournalPage } from "../pages/JournalPage";

export const JournalRoutes = () => {
  return (
    <Routes>
      {/* Esta será nuestra ruta 'home' o principal, la cual muestra nuestro componente JournalPage */}
      <Route path="/" element={<JournalPage />} />
      {/* Todas las demas rutas serán dirigidas al home o ruta principal */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

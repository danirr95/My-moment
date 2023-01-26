import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { JournalApp } from "./JournalApp";
import { store } from './store';

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Colocamos nuestro componente Provider, que será el proveedor de datos de nuestro store, el cual contiene el state y los reducers */}
    <Provider store={store}>
      {/* Nuestro componente principal JournalApp debe estar entre un contexto BrowserRouter para poder usar el componente Routes de react-router-dom que será el que usemos para servir al user nuestras distintas rutas */}
      <BrowserRouter>
        {/* Componente principal de nuestra aplicación, el cual se encarga de dirigir al user a nuestro router principal 'AppRouter' */}
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

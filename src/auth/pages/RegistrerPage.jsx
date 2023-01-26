import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

import { startCreatingUserWithEmailPassword } from "../../store/auth";

//Objeto creado que le pasamos a nuestro custom hook useForm | Son los input de informacion que recibimos del user al registrarse
const formData = {
  email: "",
  password: "",
  displayName: "",
};

//Objeto que contiene las distintas validaciones echas de forma personalizada por nosotros | Cada propiedad es en sí un array con dos elementos, el primero es una función que realiza la validación y el otro elemento es el mensaje que se la manda al user en caso de posible error
const formValidations = {
  //Propiedad 'email' (es un array) el cual como primer elemento tiene una función la cual comprueba si el valor que recibe por argumento dicha funcion contiene un @
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  //Prop que es un array cuyo primer elemento es una funcion que comprueba que le valor que recibe por argumento dicha funcion tiene un length de ocmo mínimo 6 caracteres
  password: [
    (value) => value.length >= 6,
    "El password debe de tener más de 6 letras.",
  ],
  //Prop que es un array cuyo primer elemento es una funcion que comprueba que le valor que recibe por argumento dicha funcion tiene un length de como mínimo un caracter
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
};

//Componente que forma nuestra página de registro
export const RegistrerPage = () => {
  //Almacenamos en la constante 'dispatch' la funcion useDispatch() que usamos para despachar actions hacia nuestro store
  const dispatch = useDispatch();
  //Creamos un useState para tener almacenado en una constante (dicha constante será iniciada en false) el echo de que le form haya sido enviado o no, en cada de que se ejecute el onSubmit del form, esta constante formSubmitted pasará a valer 'true'
  const [formSubmitted, setFormSubmitted] = useState(false);

  //Extraemos el status y la prop 'errorMessage' del store gracias a nuestro useSelector() | This hook (el useSelector()) takes a selector function as an argument. The selector is called with the store state | A dicho useSelector le pasamos el state del store al completo y le indicamos que solo deseamos el slice llamado 'auth' el cual contiene las prop deseadas
  const { status, errorMessage } = useSelector((state) => state.auth);
  //Almacenamos en una constante el valor booleano procedente de la comprobacion de si la prop 'status' extraída del store es exactamente gual a checking, dicha comprobación se realiza mediante una función y dicha funcion es memorizada usando el useMemo | dicha funcion del interior del useMemo se dispara cada vez que cambia la prop 'status'
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  //Desestructuramos de nuestro custom hook useForm todas las props o funciones necesarias | A dicho useForm le pasamos los objetos formData y formValidations creados mas arriba en este mismo componente RegistrerPage
  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  //Almacenamos en una constante la funcion que dispararemos cuando el form sea enviado por el user | Esta funcion recibe el event al completo
  const onSubmit = (event) => {
    //Evitamos el comportamiento por defecto (que se recargue la página, etc)
    event.preventDefault();
    //Llamamos al setter del state creado, que no es mas que una funcion y gracias a el, seteamos el valor de la constate formSubmitted en true
    setFormSubmitted(true);
    //Gracias a la prop isFormValid extraida dek useForm, podemos comprobar si el formulario es válido, en cuyo caso haríamos el return para salirnos de esta función y que no comenzara el proceso de cracion del user, ya que los datos introducidos por el user no son validos
    if (!isFormValid) return;
    //En caso de que todo este bien, despachamos la funcion que comienza la creacion del user con email y password y le pasamos por argumento todo el objeto del formState (el cual incluye email, passsword y displayName)
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  //Colocamos como componente padre el componente AuthLayout, al que le pasamos el string que deseamos que se coloque en el elemento Typography que se encuentra en el interior de dico componente padre
  return (
    <AuthLayout title="Crear cuenta">
      {/* Elemento de formulario que incluye nuestro formulario de login */}
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {/* Creamos un grid container principal que contiene todo el elemento del formulario*/}
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* Textfield con propiedades -> label para el texto identificado | type para el tipo de info que manejara ese textfield | placeholder para el texto de relleno | fullWidth para que el elemento ocupe todo el ancho que tenga disponible su padre, en este caso, el grid item*/}
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Your name"
              fullWidth
              name="displayName"
              value={displayName}
              //Cuando el valor de este textfield cambien, se llamará a la funcion onInputChange traida de nuestro useForm, la cual se encarga de cambiar el valor de las prop de nuestro objeto de formulario (formState), que en nuestro caso esta rellenado con el objeto formData
              onChange={onInputChange}
              //Lanzará un error en el caso de que se cumpla la condicion indicada entre corchetes, en este casom que displayName valid sea false y que formSubmitted este en true, esto quiere decir que el nombre no es válido y aun asi el user intento mandar el formulario | displayNameValid vale undefined al principio, con una exclamacion se convierte en booleano (true) y con otra exclamacion hacemos su negacion y pasa a valer false
              error={!!displayNameValid && formSubmitted}
              //En caso de que displayNameValid devuelva false (y que salte el error), esto querrá decir que displaNameValid no existe (ya que lo que hacemos es comprobar su existencia), por tanto el valor que contendrá displayNameValid será el valor de su mensaje de error, que será lo que se muestre al user gracias a la prop 'helpertext' en caso de que se dispare el error 
              helperText={displayNameValid}
            />
          </Grid>

          {/* Grid item que contiene el textfield del correo, propiedad xs para pantallas pequeñas (es igual que boostrap en el echo de que el total se basa siempre en 12 columnas) propiedad sx para estilos extra que le deseemos aplicar */}
          {/* Material ui tiene un diseño mobile first, por lo cual, la configuracion que le demos a pantallas 'xs' sera la que se toma como configuracion principal, y deberemos ir indicando los demsa tamaños deseados si queremos que en pantallas mas grandes se cambie dicha configuracion */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* Textfield con propiedades -> label para el texto identificado | type para el tipo de info que manejara ese textfield | placeholder para el texto de relleno | fullWidth para que el elemento ocupe todo el ancho que tenga disponible su padre, en este caso, el grid item*/}
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@googles.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          {/* Grid container con propiedad spacing -> Defines the space between the type item components. It can only be used on a type container component. | styles xtra de mb (margin-bottom de 2) y mt (margin-top de 1) */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            {/* Grid item del error de la database | Solo se mostrará (display con un string vacío) si no existe la constante errorMessage procedente del store*/}
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              {/* Componente importado de material ui para alertas | Su prop severity shows the severity of the alert. This defines the color and icon used | Si errorMessage existe, este grid item se mostrará y el contenido del alert será dicho mensaje de error*/}
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              {/* Boton con la propiedad variant la cual nos permite elegir la variante del diseño del boton que mas nos guste, en este caso, elegimos la variante 'contained' */}
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          {/* Grid container con propiedades -> direction row para que sus item hijos esten colocados en forma de fila | justifyContent = end para que sus elementos hijos sean distribuidos desde derecha a izquierda (como la escritura árabe) */}
          <Grid container direction="row" justifyContent="end">
            {/* Texto que facilita al usuario donde loguearse si ya tiene cuenta */}
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            {/* Usamos un component Link de material ui e indicamos varias propiedades -> color 'inherit' para que sea heredado, en este caso de nuestro tema | to para la ruta a la que se dirige al user cuando pulsa sobre el link*/}
            {/* Para poder usar el componente Link que usamos de react-router-dom (para redireccionar al user a otra ruta) y que sustituye a los elementos 'a', debemos importarlo con un alias para que no haya conflicto con el componente Link (que tambien sustituye a los elementos 'a') de material ui, en este caso, lo importamos con el nombre 'RouterLink'*/}
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Iniciar sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

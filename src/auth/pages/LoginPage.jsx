import { useMemo } from "react";
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
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";

//Objeto que sirve el contenido inicial de nuestro formulario de login
//Debe ser colocado fuera porque si lo colocamos dentro de la ejecución del useForm directamente, esto creará un nuevo espacio en memoria con estos datos de email y password cada vez que el componente es renderizado, lo que a su vez hará que se ejecute el useEffect de modificacion que contiene nuestro useForm en su interior. ESto hará que se esté re-renderizando continuamente nuestro useForm()
const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  //Usamos el useSelector para extraer la informacion necesario de nuestro store | un useselector no es mas que un hook usado para acceder al state del store. This hook takes a selector function as an argument. The selector is called with the store state | El useSelector recibe el state por argumento (del cual desestructuramos la propiedad status y la prop errorMessage) y devuelve el reducer que encontramos en nuestro store con el nombre 'auth' en este caso
  const { status, errorMessage } = useSelector((state) => state.auth);

  //Almacenamos en la constante 'dispatch' la funcion que utilizaremos para despachar las actions a nuestro store
  const dispatch = useDispatch();
  //Usamos nuestro custom hook useForm, al cual le pasamos un password y un email, los cuales formarán el initialState de nuestro useForm | Este mismo email y pass, junto a la función onInputChange creada en nuestro archivo del useForm, las desestructuramos
  const { email, password, onInputChange } = useForm(formData);

  //Almacenamos en la constante 'isAuthenticating' la función useMemo que memoriza el estado del user | este useMemo recibe por argumento una callback, la cual devuelve el valor booleano de hacer la comprobación de que si el status es exactamente igual a checking | como valor en sus dependencias le pasamos el status, por lo que el useMemo se volverá a ejecutar (así que se volverá a memorizar el valor del status) cada vez que cambia la constante 'status'
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  //Almacenamos en la constante 'onSubmit' la función que se dispara al hacer el submit del formulario | recibe todo el evento por argumento, evitamos el comportamiento por defecto, para que refresque la pagina por ejemplo, e indicamos que una vez que sea disparada, despache al store la función 'startLoginWithEmailPassword()'
  const onSubmit = (event) => {
    event.preventDefault();
    //Esta función 'startLoginWithEmailPassword()' recibe por argumento un objeto con cuyas props son el email y el password obtenidos de nuestro state del useForm
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  //Almacenamos en la constante 'onGoogleSignIn' la función que dispara el botón de google
  const onGoogleSignIn = () => {
    //Mensaje de comprobación por consola
    //console.log("onGoogleSignIn");
    //Al ejecutarse esta función, se despacha a nuestro store la función 'startGoogleSignIn()' la cual se encarga de hacer el login con google
    dispatch(startGoogleSignIn());
  };

  //Colocamos como componente padre el componente AuthLayout, al que le pasamos el string que deseamos que se coloque en el elemento Typography que se encuentra en el interior de dico componente padre
  return (
    <AuthLayout title="Login">
      {/* Elemento de formulario que incluye nuestro formulario de login, al pulsarse su botón de type=submit se ejecuta la función onSubmit */}
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {/* Creamos un grid container principal que contiene todo el elemento del formulario*/}
        <Grid container>
          {/* Grid item que contiene el textfield del correo, propiedad xs para pantallas pequeñas (es igual que boostrap en el echo de que el total se basa siempre en 12 columnas) propiedad sx para estilos extra que le deseemos aplicar */}
          {/* Material ui tiene un diseño mobile first, por lo cual, la configuracion que le demos a pantallas 'xs' sera la que se toma como configuracion principal, y deberemos ir indicando los demsa tamaños deseados si queremos que en pantallas mas grandes se cambie dicha configuracion */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* Textfield con propiedades -> label para el texto identificado | type para el tipo de info que manejara ese textfield | placeholder para el texto de relleno | fullWidth para que el elemento ocupe todo el ancho que tenga disponible su padre, en este caso, el grid item*/}
            <TextField
              //Textfield (que hace como un input) al que le damos un 'name' para identificarlo, el value que será el email que obtendremos para enviar a verificar y como valor onChange colocamos la función onInputChange traída de nuestro useForm la cual se encarga de modificar el valor de la prop 'email' en este caso (porque tiene el name email) en el state de nuestro useForm
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
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
            />
          </Grid>

          {/* Grid item del error de la database | Solo se mostrará (display con un string vacío) si no existe la constante errorMessage procedente del store */}
          <Grid container display={!!errorMessage ? "" : "none"} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              {/* Componente importado de material ui para alertas | Su prop severity shows the severity of the alert. This defines the color and icon used | Si errorMessage existe, este grid item se mostrará y el contenido del alert será dicho mensaje de error  */}
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          {/* Grid container con propiedad spacing -> Defines the space between the type item components. It can only be used on a type container component. | styles xtra de mb (margin-bottom de 2) y mt (margin-top de 1) */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* Grid item que en pantallas sm (small) tiene un tamaño de 6 columnas */}
            <Grid item xs={12} sm={6}>
              {/* Boton con la propiedad variant la cual nos permite elegir la variante del diseño del boton que mas nos guste, en este caso, elegimos la variante 'contained' */}
              <Button
                //Botono cuya prop disabled estará en true (y por tanto se verá en pantalla pero no podrá ser pùlsado) si la constante 'isAuthenticating' está en true, esto significará que la verificación del user se está haciendo y que debemos esperar hasta conocer un resultado | es de type="submit" ya que al pulsarse se ejecutará el onSubmit del formulario
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            {/* Grid item que en pantallas sm (small) tiene un tamaño de 6 columnas y en pantallas xs (xtra-small) ocupa las 12 columnas*/}
            <Grid item xs={12} sm={6}>
              <Button
                //Boton que al ser pulsado ejecuta la función de logueo con google
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                {/* Componente Google que contiene el icono de Google */}
                <Google />
                {/* Typography que tiene como styles xtra un margin-left de 1 para que el texto se separe dle icono de Google*/}
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          {/* Grid container con propiedades -> direction row para que sus item hijos esten colocados en forma de fila | justifyContent = end para que sus elementos hijos sean distribuidos desde derecha a izquierda (como la escritura árabe) */}
          <Grid container direction="row" justifyContent="end">
            {/* Usamos un component Link de material ui e indicamos varias propiedades -> color 'inherit' para que sea heredado, en este caso de nuestro tema | to para la ruta a la que se dirige al user cuando pulsa sobre el link*/}
            {/* Para poder usar el componente Link que usamos de react-router-dom (para redireccionar al user a otra ruta) y que sustituye a los elementos 'a', debemos importarlo con un alias para que no haya conflicto con el componente Link (que tambien sustituye a los elementos 'a') de material ui, en este caso, lo importamos con el nombre 'RouterLink'*/}
            <Link component={RouterLink} color="inherit" to="/auth/registrer">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

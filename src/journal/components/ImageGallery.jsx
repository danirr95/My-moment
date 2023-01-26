import { ImageListItem, ImageList } from "@mui/material";

//Componente que forma la galería de imágenes, dicho componente recibe un array de imagenes
export const ImageGallery = ({ images = [] }) => {
  return (
    <ImageList
      //Componente ImageList importado de Material UI, le asignamos props -> styles xtra un width del 100% del ancho disponible para el componente imagelist, un height de 500 px | indicamos que tenga 4 columnas de imagenes | y cada columna de imagenes ocupara 200 px de alto
      sx={{ width: "100%", height: 500 }}
      cols={4}
      rowHeight={200}
    >
      {images.map((image) => (
        //Mapeamos el arreglo de imagenes recibido por argumento y por cada item recibido indicamos -> que la key va a ser la prop 'image' del item, que no es mas que la url de la imagen
        <ImageListItem key={image}>
          <img
            //Indicamos de cada imagen -> su src (url)
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            //srcSet es un conjunto de imagenes (separadas por coma) candidatas a usar en determinadas circunstancias, en este caso, se utilizará la imagen indicada ne el srcSet cuando la densidad de pixeles sea el doble que para la imagen original (2x)
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Imagen de la nota"
            //loading 'lazy' indica que la imagen tendrá una carga diferida, esto quiere decir que será cargada cuando se necesite usar, para así no cargar imagenes que no van a ser mostradas aun al user
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

//Array de prueba de imagenes
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

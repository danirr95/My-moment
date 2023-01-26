//Funcion encargada de realizar la subida de las imagenes a Cloudinary
//Es async para realizar el await de la subida
//Recibe por argumento el file a subir
export const fileUpload = async( file ) => {
    //Si no recibe ningun file lanza un new Error que cierra la funcion
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');

    //URL de nuestro contenedor de imagenes, al cual deben ser subidas
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dedruttz5/upload';

    //Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data"
    //Objeto form-data que irá en el body que se mandará en nuestra petición a Cloudinary
    const formData = new FormData();
    //Añadimos a nuestro form-data (con el metodo append()) la key 'upload_preset' y su value 'journal_app'
    formData.append('upload_preset','journal_app');
    //Añadimos a nuestro form-data (con el metodo append()) la key 'file' y su value que será nuestro file recibido por argumento
    formData.append('file', file );

    try {
 
        //Almacenamos la response devuelta por la peticion echa con fetch
        //Nuestra petición fetch recibe el URL a la cual hacer la petición, así como un objeto de options con la prop 'method' que indica el metodo http utilizado y la prop 'body' en la cual mandamos nuestro form-data creado
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        //Si la prop 'ok' de nuestra response nos devuelve false es que hubo algun error y lanzamos un error para detener la ejecucion
        if ( !resp.ok ) throw new Error('No se pudo subir imagen')
        //Si todo sale bien transformamos en un json lo devuelto por nuestra response
        const cloudResp = await resp.json();

        //Por último, retornamos la prop 'secure_url' de nuestra response ya transformada en json | Dicha prop contene la url segura (https) de nuestra imagen ya subida a Cloudinary
        return cloudResp.secure_url;
    //En caso de error
    } catch (error) {
        //Consoleamos el error
        console.log(error);
        //Y lanzamos un nuevo error el cual mostrará la prop 'message' de nuestro objeto 'error'
        throw new Error( error.message );
    }

}
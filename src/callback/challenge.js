//const { Http2ServerRequest } = require('http2');

// importamos el modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// direccion de la API (Application Programming Interface)
let API = 'https://rickandmortyapi.com/api/character/'

// funcion principal
function fetchData(url_api, callback) {
    
    // crear instancia de la conexion
    let xhttp = new XMLHttpRequest();
    
    // abrir conexion con('METODO', url, ¿es asincrona?)
    xhttp.open('GET', url_api, true);
    
    //verificar el llamado
    xhttp.onreadystatechange = function (event) {
       
        //verificar que esta completada la solicitud (4)
        if(xhttp.readyState === 4) {
            
            //verificar que esta bien (200 = bien)
            if(xhttp.status === 200) {
               
                //guarda en el callback (sin error, como json la cadena de respuesta en texto de la solicitud)
                callback(null, JSON.parse(xhttp.responseText));
            } else {
               
                //crear el error si da error
                const error = new Error('Error' + url_api);
                
                //guardar en el callback el error
                return callback(error, null)
            }
        }
    }
    //se envia la solicitud
    xhttp.send();
}

//llamar por primera vez la funcion (la API, funcion_callback (error, datos)) se guardan en el primer callback
fetchData(API, function (error1, data1) {
    
    //validacion traer, guardar el error si lo hay y finalizar la funcion(return)
    if (error1) return console.error(error1);
    
    //segundo llamado a la funcion y traigo el resultado en data2 y tomo el id del primer valor se guardan en el segundo callback
    fetchData(API + data1.results[0].id, function (error2, data2) {

        //validacion traer, guardar el error si lo hay y finalizar la funcion(return)
        if (error2) return console.error(error2);

        //tercer llamado a la funcion y traigo el resultado desde la url de data2 guardando en el tercer callback
        fetchData(data2.origin.url, function (error3, data3) {

            //validacion traer, guardar el error si lo hay y finalizar la funcion(return)
            if (error3) return console.error(error3);

        //Imprimir los valores obtenidos
            //imprimir cuantos personajes existen
            console.log(data1.info.count);
            //imprimir el nombre del primer personaje
            console.log(data2.name);
            //imprimir a que dimension pertenece
            console.log(data3.dimension);
        })
    })
})
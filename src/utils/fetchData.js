//const { Http2ServerRequest } = require('http2');

// importamos el modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// funcion principal arrow function
const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
    
        // crear instancia de la conexion
    const xhttp = new XMLHttpRequest();
    
    // abrir conexion con('METODO', url, ¿es asincrona?)
    xhttp.open('GET', url_api, true);
    
    //verificar el llamado
    xhttp.onreadystatechange = (() => {
       
        //verificar que esta completada la solicitud (4)
        if(xhttp.readyState === 4) {
            
            (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error('Error ', url_api))
        }
    });
    //se envia la solicitud
    xhttp.send();
    });
  }

  module.exports = fetchData;
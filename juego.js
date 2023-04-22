const CARTAS_POR_FILA = 7;          // numero de cartas que hay en cada fila de cartas
const CARTAS_NUM_FILAS = 3;         // numero de filas
const CARTAS_REPETIDAS = 2;         // numero de veces que se repite cada carta

const CARTAS_TOTALES = CARTAS_NUM_FILAS * CARTAS_POR_FILA;
const CARTAS_RUTA = "imagenes/cartas/";
const CARTAS_NOMBRE = "carta";
const CARTAS_EXT = ".png";

window.addEventListener("DOMContentLoaded", main);

function main(){

    const contCartas = document.getElementById("contenedorCartas");
    if(contCartas){

        // generar filas con cartas repetidas
        let numeros = [];
        for(i = 0; i < CARTAS_REPETIDAS; i++){
            numerosGenerados = generarNumeros(1, CARTAS_TOTALES / CARTAS_REPETIDAS);
            numeros = numeros.concat(numerosGenerados);
        }
        
        numeros = desordenarArray(numeros);
        console.log(numeros)

        let contadorNumero = 0;
        
        for(let i = 0; i < CARTAS_NUM_FILAS; i++){
            let fila = crearDivImagenes(CARTAS_POR_FILA);
            fila.classList.add("filaCarta");
            let imagenes = fila.childNodes;

            if(imagenes.length > 0 && numeros.length >= imagenes.length){
                for(imagen of imagenes){
                    if(numeros[contadorNumero]){
                        imagen.classList.add("carta");
                        imagen.src = CARTAS_RUTA + CARTAS_NOMBRE + numeros[contadorNumero] + CARTAS_EXT;
                        //imagen.src = CARTAS_RUTA + CARTAS_NOMBRE + 0 + CARTAS_EXT;  // ocultar las cartas
                        imagen.setAttribute("data-index", numeros[contadorNumero]);
                        contadorNumero++;
                    } else {
                        fila.remove(imagen);
                    }

                }

            }

            contCartas.appendChild(fila);
        }


        // generar filas sin cartas repetidas
        /*
        for(let i = 0; i < CARTAS_NUM_FILAS; i++){

            let numeros = aleatoriosSinRepetidos(CARTAS_POR_FILA, 1, CARTAS_POR_FILA);
            let fila = crearDivImagenes(CARTAS_POR_FILA);
            
            fila.classList.add("filaCarta");
            let imagenes = fila.childNodes;
            if(imagenes.length > 0 && numeros.length >= imagenes.length){
                for(let i = 0; i < imagenes.length; i++){
                    imagenes[i].classList.add("carta");
                    imagenes[i].src = CARTAS_RUTA + CARTAS_NOMBRE + numeros[i] + CARTAS_EXT;
                    imagenes[i].setAttribute("data-index", numeros[i]);
                }
            }


            contCartas.appendChild(fila);
        }*/
        
    }

}




function crearDivImagenes(numImagenes = 0){
    let contenedor = document.createElement("div");

    if(typeof numImagenes == "number" && numImagenes >= 0){

        for(let i = 0; i < numImagenes; i++){
            let imagen = document.createElement("img");
            contenedor.appendChild(imagen);
        }

    }

    return contenedor;
}




// numeros aleatorios sin repetidos
function aleatoriosSinRepetidos(cantidad=0, min=0, max=0){

    let numeros = [];

    if(min < max && cantidad <= max){
        while(numeros.length < cantidad){

            let numero = Math.floor(Math.random() * (max - min + 1)) + min;
            
            if(!numeros.includes(numero)) {
                numeros.push(numero);
            }
    
        }
    }
    
    return numeros;
}




function generarNumeros(min = 0, max = 0){

    let numeros = [];

    if(typeof min == "number" && typeof max == "number" && min < max){

        for(let i = min; i <= max; i++){
            numeros.push(i);
        }

    }


    return numeros;
}



function generarNumerosDesordenados(min = 0, max = 0){

    let numeros = [];
    let posiciones = [];
    let desordenados = [];

    if(typeof min == "number" && typeof max == "number" && min < max){

        for(let i = min; i <= max; i++){
            numeros.push(i);
        }

    
        max = max - 1;
        min = 0;
        do{
            let posicion = Math.floor(Math.random() * (max - min + 1));
            if(!posiciones.includes(posicion)){
                desordenados.push(numeros[posicion]);
                posiciones.push(posicion);
            }
        }while(desordenados.length < numeros.length);
    }


    return desordenados;
}



function desordenarArray(array = []){

    let posiciones = [];
    let desordenados = [];

    if(Array.isArray(array) && array.length > 1){

    max = array.length - 1;
    min = 0;

    do {
        let posicion = Math.floor(Math.random() * (max - min + 1));
             if(!posiciones.includes(posicion)){
                  desordenados.push(array[posicion]);
                  posiciones.push(posicion);
             }
        }while(desordenados.length < array.length);
    }


    return desordenados;

}
const CARTAS_POR_FILA = 5;          // numero de cartas que hay en cada fila de cartas
const CARTAS_NUM_FILAS = 2;         // numero de filas
const CARTAS_REPETIDAS = 2;         // numero de veces que se repite cada carta

const CARTAS_TOTALES = CARTAS_NUM_FILAS * CARTAS_POR_FILA;
const CARTAS_RUTA = "imagenes/cartas/";
const CARTAS_NOMBRE = "carta";
const CARTAS_INVISIBLE = "Invisible";
const CARTAS_EXT = ".png";

const CLASE_CARTA_MOSTRADA = "mostrada";

window.addEventListener("DOMContentLoaded", main);

function main() {

    const contCartas = document.getElementById("contenedorCartas");
    if (contCartas) {

        // generar los numeros de las cartas
        let numeros = [];
        for (i = 0; i < CARTAS_REPETIDAS; i++) {
            numerosGenerados = generarNumeros(1, CARTAS_TOTALES / CARTAS_REPETIDAS);
            numeros = numeros.concat(numerosGenerados);
        }

        numeros = desordenarArray(numeros);
        console.log(numeros);


        // generar filas con cartas repetidas
        // **********************************
        let contadorNumero = 0;

        for (let i = 0; i < CARTAS_NUM_FILAS; i++) {
            let fila = crearDivImagenes(CARTAS_POR_FILA);
            fila.classList.add("filaCarta");
            let imagenes = fila.childNodes;

            if (imagenes.length > 0 && numeros.length >= imagenes.length) {
                for (imagen of imagenes) {
                    if (numeros[contadorNumero]) {
                        imagen.classList.add("carta");
                        imagen.src = CARTAS_RUTA + CARTAS_NOMBRE + 0 + CARTAS_EXT;  // ocultar las cartas
                        imagen.setAttribute("data-index", numeros[contadorNumero]);
                        imagen.addEventListener("click", voltearCartaListener);
                        contadorNumero++;
                    } else {
                        fila.remove(imagen);
                    }

                }

            }

            contCartas.appendChild(fila);
        }


        /*
        // generar filas sin cartas repetidas
        // **********************************
        for (let i = 0; i < CARTAS_NUM_FILAS; i++) {
            let fila = crearDivImagenes(CARTAS_POR_FILA);
            fila.classList.add("filaCarta");
            let imagenes = fila.childNodes;

            if (imagenes.length > 0 && numeros.length >= imagenes.length) {
                let auxiliar = [];
                for (imagen of imagenes) {

                    let posicion = 0;
                    let numero = -1;
                    let salida = true;
                    do{
                        numero = numeros[posicion];   // bucle para seleccionar el numero de la carta
                        
                        if(numero){
                            salida = !auxiliar.includes(numero);
                            if(salida){
                                auxiliar.push(numero);
                                numeros.splice(posicion, 1);
                            } else {
                                numero = numeros[posicion];
                            }

                        }
                        posicion++;

                    }while(numero && !salida && numeros.length > 0);

                    console.log(numeros + "; auxiliar: " + auxiliar);

                    if(numero && numero != -1){
                        imagen.classList.add("carta");
                        //imagen.src = CARTAS_RUTA + CARTAS_NOMBRE + numero + CARTAS_EXT;
                        imagen.src = CARTAS_RUTA + CARTAS_NOMBRE + 0 + CARTAS_EXT;  // ocultar las cartas
                        imagen.setAttribute("data-index", numero);
                        imagen.addEventListener("click", voltearCartaListener);
                    } else {
                        fila.remove(imagen);
                    }

                }

            }

            contCartas.appendChild(fila);
        }
        */

    }

}




function voltearCartaListener(e) {

    let carta = e.target;
    let index = carta.dataset?.index;

    carta.src = CARTAS_RUTA + CARTAS_NOMBRE + index + CARTAS_EXT;
    carta.classList.add(CLASE_CARTA_MOSTRADA);
    carta.removeEventListener("click", voltearCartaListener);

    let cartasTablero = document.querySelectorAll("#contenedorCartas ." + CLASE_CARTA_MOSTRADA);

    if(cartasTablero && index){
        cartasTablero = [...cartasTablero];
        let acierto = cartasTablero.every(element => element.dataset.index == index);

        cartasTablero.forEach(function (imagen){
            
            if(!acierto || (!acierto && cartasTablero.length >= CARTAS_REPETIDAS)){
                index = 0;
                imagen.classList.remove(CLASE_CARTA_MOSTRADA);
                imagen.addEventListener("click", voltearCartaListener);
            }

            if(acierto && cartasTablero.length >= CARTAS_REPETIDAS){
                index = CARTAS_INVISIBLE;
                imagen.classList.remove(CLASE_CARTA_MOSTRADA);
            }
        
            setTimeout(function(){
                imagen.src = CARTAS_RUTA + CARTAS_NOMBRE + index + CARTAS_EXT;
            }, 700);
         });

    }

}




function crearDivImagenes(numImagenes = 0) {
    let contenedor = document.createElement("div");

    if (typeof numImagenes == "number" && numImagenes >= 0) {

        for (let i = 0; i < numImagenes; i++) {
            let imagen = document.createElement("img");
            contenedor.appendChild(imagen);
        }

    }

    return contenedor;
}




function generarNumeros(min = 0, max = 0) {

    let numeros = [];

    if (typeof min == "number" && typeof max == "number" && min < max) {

        for (let i = min; i <= max; i++) {
            numeros.push(i);
        }
    }

    return numeros;
}




function desordenarArray(array = []) {

    let desordenados = [];

    if (Array.isArray(array) && array.length > 1) {
        let fin = array.length;

        for (let i = 0; i < fin; i++) {
            max = array.length - 1;
            min = 0;
            let posicion = Math.floor(Math.random() * (max - min + 1));
            desordenados.push(array[posicion]);
            array.splice(posicion, 1);
        }
    }

    return desordenados;
}
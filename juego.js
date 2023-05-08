const CARTAS_POR_FILA = 5;          // numero de cartas que hay en cada fila de cartas
const CARTAS_NUM_FILAS = 2;         // numero de filas
const CARTAS_REPETIDAS = 2;         // numero de veces que se repite cada carta

const CARTAS_TOTALES = CARTAS_NUM_FILAS * CARTAS_POR_FILA;
const CARTAS_RUTA = "imagenes/cartas/";
const CARTAS_NOMBRE = "carta";
const CARTAS_EXT = ".png";

const CLASE_CARTA_MOSTRADA = "mostrada";


window.addEventListener("DOMContentLoaded", main);


function main() {

    inicializarJuego();

}



function inicializarJuego(){

    const contCartas = document.getElementById("contenedorCartas");
    if (contCartas) {

        // generar los numeros de las cartas
        let numeros = [];
        for (i = 0; i < CARTAS_REPETIDAS; i++) {
            numerosGenerados = generarNumeros(1, CARTAS_TOTALES / CARTAS_REPETIDAS);
            numeros = numeros.concat(numerosGenerados);
        }

        numeros = desordenarArray(numeros);

        // borrar las filas de cartas previas si hubiera
        const filas = contCartas.querySelectorAll(".filaCarta");
        filas.forEach(fila => fila.remove());


        // generar filas con cartas repetidas
        // **********************************
        let contadorNumero = 0;

        for (let i = 0; i < CARTAS_NUM_FILAS; i++) {
            let fila = crearFilasDiv(CARTAS_POR_FILA);
            fila.classList.add("filaCarta");
            let cartas = fila.childNodes;

            if (cartas.length > 0 && numeros.length >= cartas.length) {
                for (carta of cartas) {
                    if (numeros[contadorNumero]) {
                        carta.classList.add("carta");
                        carta.setAttribute("data-index", numeros[contadorNumero]);
                        carta.style.backgroundImage = `url('${CARTAS_RUTA}${CARTAS_NOMBRE}${numeros[contadorNumero]}${CARTAS_EXT}')`;
                        carta.addEventListener("click", voltearCartaListener);
                        contadorNumero++;
                    } else {
                        fila.remove(carta);
                    }

                }

            }

            contCartas.appendChild(fila);
        }

    }

}




function voltearCartaListener(e) {

    let carta = e.target;
    let index = carta.dataset?.index;

    carta.classList.add("mostrando");
    carta.classList.add(CLASE_CARTA_MOSTRADA);

    carta.removeEventListener("click", voltearCartaListener);

    let cartasTablero = document.getElementById("contenedorCartas")?.getElementsByClassName(CLASE_CARTA_MOSTRADA);

    console.log(cartasTablero)

    if (cartasTablero && index) {
        cartasTablero = [...cartasTablero];
        let acierto = cartasTablero.every(element => element.dataset.index == index);

        cartasTablero.forEach(function (imagen) {

            if (!acierto || (!acierto && cartasTablero.length >= CARTAS_REPETIDAS)) { // si se falla
                imagen.classList.remove(CLASE_CARTA_MOSTRADA);

                setTimeout(function () {
                    imagen.classList.add("ocultando");
                    imagen.classList.remove("mostrando");
                }, 600);

                setTimeout(function () {
                    imagen.classList.remove("ocultando");
                    imagen.addEventListener("click", voltearCartaListener);
                }, 900)

            }

            if (acierto && cartasTablero.length >= CARTAS_REPETIDAS) { // si se hace la pareja
                imagen.classList.remove(CLASE_CARTA_MOSTRADA);

                setTimeout(function () {
                    imagen.classList.remove("mostrando");
                    imagen.style.background = "none";
                }, 600)

            }

        });

        // si ya no hay cartas se inicializa el juego de nuevo
        setTimeout(function(){
            let cartas = [...document.querySelectorAll("#contenedorCartas .carta")];
            if(cartas.length > 0 && cartas.every(carta => carta.style.backgroundImage == "none") ){
                inicializarJuego();
            }
        }, 1100);

    }

}




function crearFilasDiv(numDiv = 0) {
    let contenedor = document.createElement("div");

    if (typeof numDiv == "number" && numDiv >= 0) {

        for (let i = 0; i < numDiv; i++) {
            let divElement = document.createElement("div");
            contenedor.appendChild(divElement);
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
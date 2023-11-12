//datos
let partidasGanadas = [0, 0]//x,o
let turno;//0:x,1:o
let casillas = new Array(9).fill("")//0 1 2,3 4 5,6 7 8
const texto = ['X', 'O']
globalThis.addEventListener('load', () => {
    actualizar_marcador()
    elegirTurno()
})
document.querySelectorAll('.casilla').forEach(element => {
    element.addEventListener('click', () => {
        cambiar_valor_casilla(element.id)
    })
});
function elegirTurno() {
    if (turno === 0) {
        turno = 1
    }
    else if (turno === 1) {
        turno = 0
    }
    else {
        turno = Math.floor(Math.random() * 1)
    }
    //mostrar
    document.querySelector('#text-turno-actual').innerHTML = `Turno de ${texto[turno]}`
}
function actualizar_marcador() {
    if (partidasGanadas[0] > 0) {
        document.querySelector('#marcador-x-numero').innerHTML = partidasGanadas[0]
    }
    else {
        document.querySelector('#marcador-x-numero').innerHTML = "-"
    }
    if (partidasGanadas[1] > 0) {
        document.querySelector('#marcador-o-numero').innerHTML = partidasGanadas[1]
    }
    else {
        document.querySelector('#marcador-o-numero').innerHTML = "-"
    }
}
function partida_finalizada(ganador) {
    partidasGanadas[ganador]++
    actualizar_marcador()
    casillas = new Array(9).fill("")
    turno = null
    elegirTurno()
    reiniciar_tablero()
}
function cambiar_valor_casilla(id_casilla) {
    if (document.getElementById(id_casilla).innerHTML != texto[0] && document.getElementById(id_casilla).innerHTML != texto[1] ) {
        document.getElementById(id_casilla).innerHTML = texto[turno]
        const casilla_recibida = id_casilla.split('-')
        let numero_casilla = Number(casilla_recibida[0]) * 2 + Number(casilla_recibida[0]) + Number(casilla_recibida[1]);
        casillas[numero_casilla - 1] = texto[turno]
        comprobar_tablero()
    }
}
function comprobar_tablero() {
    let ganador;
    //laterales
    for (let i = 0; i < 3; i++) {
        if ((casillas[(i * 3)] != "") && ((casillas[(i * 3)] === casillas[(i * 3 + 1)]) && (casillas[(i * 3)] === casillas[(i * 3 + 2)]))) {
            ganador = [[(i * 3), (i * 3 + 1), (i * 3 + 2)], casillas[i * 3]]//casillas canadoras
            break;
        }
    }
    //verticales
    if (ganador == undefined) {
        for (let i = 0; i < 3; i++) {
            if ((casillas[(i)] != "") && ((casillas[(i)] === casillas[(i + 3)]) && (casillas[(i)] === casillas[(i + 6)]))) {
                ganador = [[(i), (i + 3), (i + 6)], casillas[i]]//casillas canadoras
                break;
            }
        }
    }
    //diagonales
    if (ganador == undefined) {
        if ((casillas[0] != "") && (casillas[0] === casillas[4]) && (casillas[0] === casillas[8])) {
            ganador = [[0, 4, 8], casillas[0]]
        }
        else if ((casillas[7] != "") && (casillas[6] === casillas[4]) && (casillas[6] === casillas[2])) {
            ganador = [[6, 4, 2], casillas[6]]
        }
    }
    //ganador?
    if (ganador != undefined) {//ganador
        let simboloGanador = -1
        if (ganador[1] === texto[0]) {
            simboloGanador = 0
        }
        else if (ganador[1] === texto[1]) {
            simboloGanador = 1
        }
        if (simboloGanador != -1) {
            partida_finalizada(simboloGanador)
        }
    }
    else {
        let empate = true
        for (let i = 0; i < casillas.length; i++) {
            if (casillas[i] === "") {//partida sin terminar
                empate = false
            }
        }
        elegirTurno()
    }
}
function reiniciar_tablero() {
    //casillas
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`${i}-${j + 1}`).innerHTML = ""
        }
    }
}
document.querySelector('#reiniciar-marcador').addEventListener('click', () => {
    casillas = new Array(9).fill("")
    partidasGanadas = [0, 0]
    actualizar_marcador()
    reiniciar_tablero()
    turno = null
    elegirTurno()
})
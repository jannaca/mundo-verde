//Crear base de datos en formato JSON
const trivia = `{
    "nombre": "Trivia de Reciclaje",
    "jugadores": [
      "Paula",
      "Janna"
    ],
    "puntajes": [
      500,
      250
    ],
    "preguntas_correctas": [
        10,
        5
    ]
  }`

//Leer la base de datos
let jsonConvertido = JSON.parse(trivia);
// console.log(jsonConvertido);

//crear una función que nos deje agregar un nuevo elemento a la base de datos.
const agregarNuevoElemento = (jugador) => {
jsonConvertido.jugadores.push(jugador);

//Falta agregar a la base de datos los datos de puntajes y preguntas_correctas pero esto se agregaria cuando se defina el sistema de puntuaje
}

//Almacenar en Storage información ingresada por el usuario
let nombreJugador = prompt("Ingrese su nombre")
localStorage.setItem('nombreJugador', nombreJugador);

//Aqui agrego el nombre del jugador a la base de datos
agregarNuevoElemento(nombreJugador)

//Que el usuario pueda ver en nuestra app, información que tenemos guardada en nuestra base de datos.
alert(`Bienvenido a la trivia de reciclaje ${jsonConvertido.jugadores[jsonConvertido.jugadores.length-1]}!`)

console.log(jsonConvertido);










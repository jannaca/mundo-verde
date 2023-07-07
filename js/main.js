//Copia de la base de datos
let preguntas = [...baseDeDatos];

// ----- Nodos -----
const preguntasNumeros = document.querySelector(".preguntas-numeros");
const preguntaTexto = document.querySelector(".pregunta-texto");
const btnSiguiente = document.querySelector(".btn-siguiente");
const contenedorOpciones = document.querySelector(".preguntas-opciones");
const resultadosCorrectos = document.querySelector(".total-correctas");
const resultadosIncorrectos = document.querySelector(".total-incorrectas");
const resultadosPreguntas = document.querySelector(".total-preguntas");
const resultadosPorcentaje = document.querySelector(".porcentaje");
const resultadosTotal = document.querySelector(".total-puntuaje");
const resultadosPuntajeMasAlto = document.querySelector(".puntuaje-mas-alto");
const btnEmpezar = document.querySelector(".btn-empezar");
const sectionOcultar = document.querySelector(".section-ocultar");
const containerTrivia = document.querySelector(".container-trivia");
const containerResultado = document.querySelector(".container-resultado");
const intentarNuevamente = document.querySelector(".btn-intentar-nuevamente");

// ---- Variables -----
let contadorDePreguntas = 1;
let preguntaActual;
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;

// ----- Funciones -------

const empezarTrivia = () => {
  sectionOcultar.classList.add("d-none");
  containerTrivia.classList.remove("d-none");
};

const generarPregunta = () => {
  //Imprimo el numero de preguntas en la pagina
  preguntasNumeros.innerText = `Pregunta ${contadorDePreguntas} de ${baseDeDatos.length}`;

  //Genero una pregunta aleatoria
  const indexPregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
  preguntaActual = indexPregunta;

  //Elimino del array la pregunta para que no se vuelva a repetir la pregunta
  preguntas.splice(preguntas.indexOf(indexPregunta), 1);

  //Imprimo la pregunta en la pagina
  preguntaTexto.innerText = indexPregunta.pregunta;

  btnSiguiente.classList.add("d-none");

  generarRespuesta();
};

const generarRespuesta = () => {
  const opcionesDisponbles = preguntaActual.opciones.length;
  let animationDelay = 0.2;

  for (let i = 0; i < opcionesDisponbles; i++) {
    const cajaDeOpciones = document.createElement("div");
    cajaDeOpciones.innerHTML = preguntaActual.opciones[i];
    cajaDeOpciones.id = i;
    cajaDeOpciones.className = "option";
    contenedorOpciones.appendChild(cajaDeOpciones);
    cajaDeOpciones.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.2;
  }
};
generarPregunta();

const señalarResultado = (e) => {
  let elemento = e.target;

  if (
    elemento.classList.contains("option") &&
    elemento.id == preguntaActual.respuesta
  ) {
    respuestasCorrectas++;

    elemento.classList.add("correcto");
  } else if (
    elemento.classList.contains("option") &&
    elemento.id !== preguntaActual.respuesta
  ) {
    respuestasIncorrectas++;

    elemento.classList.add("incorrecto");

    //En caso de ser incorrecta la pregunta señala cual SI era la respuesta correcta
    const elementoCorrecto =
      contenedorOpciones.children[preguntaActual.respuesta];
    elementoCorrecto.classList.add("correcto");
  }
  btnSiguiente.classList.remove("d-none");

  unclickableOpciones();
};

const siguientePregunta = () => {
  if (contadorDePreguntas == baseDeDatos.length) {
    containerTrivia.classList.add("d-none");
    containerResultado.classList.remove("d-none");
    mostrarResultados();
  } else {
    contadorDePreguntas++;
    contenedorOpciones.innerHTML = "";
    generarPregunta();
  }
};

const unclickableOpciones = () => {
  for (let i = 0; i < preguntaActual.opciones.length; i++) {
    contenedorOpciones.children[i].classList.add("seleccionado");
  }
};

const mostrarResultados = () => {
  resultadosPreguntas.innerText = baseDeDatos.length;
  resultadosCorrectos.innerText = respuestasCorrectas;
  resultadosIncorrectos.innerText = respuestasIncorrectas;
  resultadosPorcentaje.innerText = `${
    (respuestasCorrectas / baseDeDatos.length) * 100
  }%`;
  resultadosTotal.innerText = `${respuestasCorrectas} / ${baseDeDatos.length}`;

  localStorage.setItem("puntaje", respuestasCorrectas);
  let puntajeMaximo = localStorage.getItem("puntajeMaximo");
  if (puntajeMaximo === null || respuestasCorrectas > puntajeMaximo) {
    localStorage.setItem("puntajeMaximo", respuestasCorrectas);
    puntajeMaximo = respuestasCorrectas;
  }
  resultadosPuntajeMasAlto.innerHTML = `${puntajeMaximo} / ${baseDeDatos.length}`;
};

// ------ Eventos -------
btnSiguiente.addEventListener("click", siguientePregunta);
contenedorOpciones.addEventListener("click", señalarResultado);
btnEmpezar.addEventListener("click", empezarTrivia);
intentarNuevamente.addEventListener("click", () => {
  location.reload();
});

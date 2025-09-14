//ARCHIVO CON FRONTEND JS AVANZADO
///** FUNCION INICIARJUEGO */
const resultadoFinal = document.getElementById("seccion_mensaje_final")
const botonReiniciarJuego = document.getElementById("seccion_reiniciar")
const botonPersonajeJugador = document.getElementById("boton_seleccionar")
const botonReiniciar = document.getElementById("boton_reiniciar")

///** FUNCION SELECCIONARMASCOTAJUGADOR */
const seccionSeleccionarPersonaje = document.getElementById(  "seleccionar_personaje")
const seccionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
let spanPersonajeJugador = document.getElementById("personaje_jugador")
let spanPersonajeEnemigo = document.getElementById("personaje_enemigo")

///** FUNCION COMBATE */
const spanVidasJugador = document.getElementById("total_vidas_jugador")
const spanVidasEnemigo = document.getElementById("total_vidas_enemigo")

///** SECCIONDETALLESBATALLAS */
const seccionDetallesBatallas = document.getElementById("seccion_mensajes")

///** FUNCION CREAR MENSAJE */
const ataquesDelJugador = document.getElementById("ataque_jugador")
const ataquesDelEnemigo = document.getElementById("ataque_enemigo")
const seccionMensajes = document.getElementById("resultado_combate")

///** FUNCION CREAR MENSAJE FINAL */
const seccionMensajeFinal = document.getElementById("seccion_mensaje_final")

///** FUNCION REINICIAR */
const seccionReiniciar = document.getElementById("seccion_reiniciar")
const resultadoFinalCombate = document.getElementById("seccion_mensaje_final")

//** RENDERIZAR LAS TARJETAS DE MOKEPONES
const contenedorTarjetas = document.getElementById("contenedor_Tarjetas")
const contenedorAtaques = document.getElementById("contenedor_Ataques")
// const ataquesPersonajeEnemigo = document.getElementById

//** SECCION MAPA
const seccionVerMapa = document.getElementById("ver_mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let personajes = []
let personajesEnemigos = []
// let personajeEnemigo = null
let opcionDePersonajes
let inputUsa
let inputRusia
let inputChina
let inputNorcorea
let inputVenezuela
let inputSalvador
let ataquesPersonaje
let ataquesPersonajeEnemigo
let botonBomba
let botonVirus
let botonMisil
let botones = []
let personajeJugador
let personajeJugadorObjeto
let ataqueEnemigo = []
let ataqueJugador = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let intervalo
let lienzo = mapa.getContext("2d")
let mapaBackground = new Image()
mapaBackground.src = "./assets/img/mapamundi.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 650

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

// CLASE CONSTRUCTOR PERSONAJE
class Personaje {
  constructor(nombre, foto, vidas, fotoMapa, id = null) {
    this.id = id
    this.nombre = nombre
    this.foto = foto
    this.vidas = vidas
    this.ataques = []
    this.ancho = 60
    this.alto = 60
    this.x = aleatorio(0, mapa.width - this.ancho)
    this.y = aleatorio(0, mapa.height - this.alto)
    this.mapaFoto = new Image()
    this.mapaFoto.src = fotoMapa
    this.velocidadX = 0
    this.velocidadY = 0
  }

  pintarPersonaje() {
    lienzo.drawImage(
      this.mapaFoto,
      this.x, //posicion X
      this.y, //posicion Y
      this.ancho, //ancho en px
      this.alto //alto en px
    )
  }
}

// OBJETOS PERSONAJES JUGADOR
/************* POLITICOS */
let usa = new Personaje ("Trump", "./assets/img/trump.png", 5, "./assets/img/trump.png")
let rusia = new Personaje ("Putin", "./assets/img/putin.png", 5, "./assets/img/putin.png")
let china = new Personaje ("Jinping", "./assets/img/jinping.png", 5, "./assets/img/jinping.png")
let norcorea = new Personaje ("Jong-un", "./assets/img/jhon_hun.png", 5, "./assets/img/jhon_hun.png")
let venezuela = new Personaje ("Maduro", "./assets/img/maduro.png", 5, "./assets/img/maduro.png")
let salvador = new Personaje ("Bukele", "./assets/img/bukele.png", 5, "./assets/img/bukele.png")
// ATAQUES JUGADORES
const usaAtaques = [
  { nombre: "BOMBA ☢️", id: "boton_bomba"},
  { nombre: "VIRUS 🦠", id: "boton_virus"},
  { nombre: "BOMBA ☢️", id: "boton_bomba"},
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "BOMBA ☢️", id: "boton_bomba"}
]

const rusiaAtaques = [
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "BOMBA ☢️", id: "boton_bomba"},
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "VIRUS 🦠", id: "boton_virus"},
  { nombre: "MISIL 🚀", id: "boton_misil"}
]

const chinaAtaques = [
  { nombre: "VIRUS 🦠", id: "boton_virus"},
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "VIRUS 🦠", id: "boton_virus"},
  { nombre: "BOMBA ☢️", id: "boton_bomba"},
  { nombre: "VIRUS 🦠", id: "boton_virus"}
]

const norcoreaAtaques = [
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "BOMBA ☢️", id: "boton_bomba"},
  { nombre: "VIRUS 🦠", id: "boton_virus"},
  { nombre: "BOMBA ☢️", id: "boton_bomba"}
]

const venezuelaAtaques = [
  { nombre: "VIRUS 🦠", id: "boton_virus"},
  { nombre: "BOMBA ☢️", id: "boton_bomba"},
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "VIRUS 🦠", id: "boton_virus"}
]

const salvadorAtaques = [
  { nombre: "VIRUS 🦠", id: "boton_virus"},
  { nombre: "BOMBA ☢️", id: "boton_bomba"},
  { nombre: "VIRUS 🦠", id: "boton_virus"},
  { nombre: "MISIL 🚀", id: "boton_misil"},
  { nombre: "MISIL 🚀", id: "boton_misil"}
]

usa.ataques.push(...usaAtaques)
rusia.ataques.push(...rusiaAtaques)
china.ataques.push(...chinaAtaques)
norcorea.ataques.push(...norcoreaAtaques)
venezuela.ataques.push(...venezuelaAtaques)
salvador.ataques.push(...salvadorAtaques)

// METEMOS LOS OBJETOS MOKEPON EN EL ARRAY MOKEPONES
personajes.push(
  usa,
  rusia,
  china,
  norcorea,
  venezuela,
  salvador
)

//FUNCIÓN iniciarJuego  -  PARA INICIAR EL JUEGO
function iniciarJuego() {
  //ESCONDER SECCIÓN "ATAQUE" MIENTRAS NO SE ELIJA EL PERSONAJE
  seccionSeleccionarAtaque.style.display = "none"
  //OCULTAR SECCION MAPA
  seccionVerMapa.style.display = "none"
  //ESCONDER SECCIÓN "ATAQUE" MIENTRAS NO SE ELIJA EL PERSONAJE
  resultadoFinal.style.display = "none"
  //ESCONDER SECCIÓN "DETALLE BATALLAS" MIENTRAS NO COMIENCE BATALLA
  seccionDetallesBatallas.style.display = "none"
  //ESCONDE BOTÓN "REINICIAR" MIENTRAS NO TERMINE EL JUEGO
  botonReiniciarJuego.style.display = "none"

  //SE CREA EL EVENTO 'CLICK' PARA SELECCIONAR PERSONAJE
  personajes.forEach((personaje) => {
    opcionDePersonajes = `
        <input type="radio" name="personaje" id="${personaje.nombre}"/>
        <label  class="card_personaje" for="${personaje.nombre}">
        <img src="${personaje.foto}" alt="${personaje.nombre}" >
        <h4>${personaje.nombre}</h4>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDePersonajes

    inputUsa = document.getElementById("Trump")
    inputRusia = document.getElementById("Putin")
    inputChina = document.getElementById("Jinping")
    inputNorcorea = document.getElementById("Jong-un")
    inputVenezuela = document.getElementById("Maduro")
    inputSalvador = document.getElementById("Bukele")
  })
  botonPersonajeJugador.addEventListener("click", seleccionarPersonajeJugador)
  botonReiniciar.addEventListener("click", reiniciarJuego)

  //UNIR EL CODIGO AL SERVIDOR
  unirseAlJuego()
}

//FUNCION unirseAlJuego  - CONECTARSE AL SERVIDOR Y GENERAR UNA SOLICITUD
function unirseAlJuego() {
  fetch("http://localhost:8080/unirse")
    .then(function (res) {
      if (res.ok) {
        res.text()
          .then(function (respuesta) {
            jugadorId = respuesta
          })
      }
  })
}

//FUNCION seleccionarPersonajeJugador
//AL FINALIZAR LLAMA FUNCION - FETCH seleccionarPersonaje
function seleccionarPersonajeJugador() {
 
  //TEXTO DE LA MASCOTA QUE ELEGISTE
  if (inputUsa.checked) {
      spanPersonajeJugador.innerHTML = inputUsa.id
      personajeJugador = inputUsa.id
    } else if (inputRusia.checked) {
      spanPersonajeJugador.innerHTML = inputRusia.id
      personajeJugador = inputRusia.id
    } else if (inputChina.checked) {
      spanPersonajeJugador.innerHTML = inputChina.id
      personajeJugador = inputChina.id
    } else if (inputNorcorea.checked) {
      spanPersonajeJugador.innerHTML = inputNorcorea.id
      personajeJugador = inputNorcorea.id
    } else if (inputVenezuela.checked) {
      spanPersonajeJugador.innerHTML = inputVenezuela.id
      personajeJugador = inputVenezuela.id
    } else if (inputSalvador.checked) {
      spanPersonajeJugador.innerHTML = inputSalvador.id
      personajeJugador = inputSalvador.id
    } else {
      alert("SELECCIONA UN PERSONAJE")
      return
  }
   //ESCONDER SECCIÓN "PERSONAJES"  MIENTRAS NO SE ELIJA UNO
  seccionSeleccionarPersonaje.style.display = "none"
  //MOSTRAR SECCION MAPA
  seccionVerMapa.style.display = "flex"

  seleccionarPersonaje(personajeJugador)
  extraerAtaques(personajeJugador)
  iniciarMapa()
}

//FUNCION FETCH seleccionarPersonaje - ESTA FUNCIÓN ENVÍA EL PERSONAJE SELECCIONADO AL BACKEND
function seleccionarPersonaje(personajeJugador) {
  fetch(`http://localhost:8080/munpower/${jugadorId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personaje: personajeJugador
    })
  })
}

//FUNCION EXTRAER ATAQUES
function extraerAtaques(personajeJugador) {
  let ataques
  for (let i = 0; i < personajes.length; i++) {
    if (personajeJugador === personajes[i].nombre) {
      ataques = personajes[i].ataques
    }
  }
  mostrarAtaques(ataques)
}

//FUNCION MOSTRAR ATAQUES
function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesPersonaje = `
          <button id="${ataque.id}" class="btn-ataque BAtaque">${ataque.nombre}</button>
        `
    contenedorAtaques.innerHTML += ataquesPersonaje
  })
  // botonBomba = document.getElementById("boton_bomba")
  // botonVirus = document.getElementById("boton_virus")
  // botonMisil = document.getElementById("boton_misil")
  botones = document.querySelectorAll(".BAtaque")
}

//FUNCION secuenciaAtaques
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "BOMBA ☢️") {
        ataqueJugador.push("BOMBA ☢️")
        console.log(ataqueJugador)
        boton.style.background = "#112f58"
        boton.disabled = true
      } else if (e.target.textContent === "VIRUS 🦠") {
        ataqueJugador.push("VIRUS 🦠")
        console.log(ataqueJugador)
        boton.style.background = "#112f58"
        boton.disabled = true
      } else {
        ataqueJugador.push("MISIL 🚀")
        console.log(ataqueJugador)
        boton.style.background = "#112f58"
        boton.disabled = true
      }

      if(ataqueJugador.length === 5){
        enviarAtaques()
      }
    })
    seccionDetallesBatallas.style.display = "flex"
  })
}

//FUNCION PARA ENVIAR EL ATAQUE A BACKEND
function enviarAtaques(){
  fetch(`http://localhost:8080/munpower/${jugadorId}/ataques`,{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      ataques: ataqueJugador
    })
  })
  intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques (){
  fetch(`http://localhost:8080/munpower/${enemigoId}/ataques`)
    .then(function (res){
      if(res.ok){
        res.json()
          .then(function ({ataques}){
            if(ataques.length === 5){
              ataqueEnemigo = ataques
              console.log(ataques)
              combate()
            }
          })
      }
    })
}

//MASCOTA DEL ENEMIGO (ALEATORIO)
function seleccionarPersonajeEnemigo(enemigo) {
  spanPersonajeEnemigo.innerHTML = enemigo.nombre
  ataquesPersonajeEnemigo = enemigo.ataques
  //LLAMANDO FUNCION SECUENCIAATAQUES
  secuenciaAtaque()
  
}

//ATAQUES
//FUNCIÓN ATAQUE ALEATORIO DEL ENEMIGO
function ataqueAleatorioEnemigo() {
  // console.log('Ataques enemigo', ataquesPersonajeEnemigo)
  let ataqueAleatorio = aleatorio(0, ataquesPersonajeEnemigo.length - 1)

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("BOMBA ☢️")
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("VIRUS 🦠")
  } else {
    ataqueEnemigo.push("MISIL 🚀")
  }
  console.log(ataqueEnemigo)
  iniciarPelea()
}

//esta funcion inicia la pelea, y hace que se espere 5 ataques para imprimir el array de los ataques
function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate()
  }
}

//esta función guarda los ataques de cada oponente en un array
function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
  //1 Bomba  BOMBA VENCE MISIL   //2 Virus  VIRUS VENCE BOMBA   //3 Misil  MISIL VENCE VIRUS
  //APARECE SECCIÓN DETALLE DE LAS BATALLAS
  seccionDetallesBatallas.style.display = "flex"  //************************* */

  clearInterval(intervalo)
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index)
      crearMensaje("TREGUA 🤝🕊️")
    } else if (ataqueJugador[index] === "BOMBA ☢️" && ataqueEnemigo[index] == "MISIL 🚀") {
      indexAmbosOponentes(index, index)
      crearMensaje("VENCISTE 🪖😎")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === "VIRUS 🦠" && ataqueEnemigo[index] == "BOMBA ☢️") {
      indexAmbosOponentes(index, index)
      crearMensaje("VENCISTE 🪖😎")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === "MISIL 🚀" && ataqueEnemigo[index] == "VIRUS 🦠") {
      indexAmbosOponentes(index, index)
      crearMensaje("VENCISTE 🪖😎")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else {indexAmbosOponentes(index, index)
      crearMensaje("PERDISTE 🤕💔")
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
  }
  revisarVictorias()
}

function revisarVictorias() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("TREGUA 🤝🕊️")
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("VENCISTE 🪖😎")
  } else {
    crearMensajeFinal("PERDISTE 🤕💔")
  }
}

//MENSAJE RESULTADO BATALLA INDIVIDUAL
function crearMensaje(resultado) {
  //CREAMOS EL ELEMENTO "PARRAFO"
  let nuevoAtaqueDelJugador = document.createElement("p")
  let nuevoAtaqueDelEnemigo = document.createElement("p")

  //AGREGAMOS LA INFORMACIÓN AL ELEMENTO CREADO
  // seccionMensajes.innerHTML = resultado    //********* */
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

  //INDICAMOS DONDE SE VA AGREGAR EL NUEVO ELEMENTO
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

  // console.log("funcion_crearMensaje_trabajando_bien")
}

//MENSAJE RESULTADO DE TODAS LAS BATALLA
function crearMensajeFinal(resultadoFinal) {
  seccionMensajeFinal.innerHTML = resultadoFinal    
  //PARA MOSTRAR SECCION REINICIAR AL TERMINARSE LAS VIDAS
  seccionReiniciar.style.display = "flex"
  //MOSTRAR EL RESULTADO FINAL DE LAS BATALLAS AL TERMINARSE LAS VIDAS
  resultadoFinalCombate.style.display = "flex"
}

//BOTÓN REINICIAR JUEGO
function reiniciarJuego() {

}

//FUNCIÓN ALEATORIO (ELIGE PERSONAJE Y ATAQUE ENEMIGO)
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//SE CREA MAPA Y SE PINTA PERSONAJE EN ESTAS COORDENADAS
function pintarCanvas() {
  personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
  personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBackground, 
    0, 
    0, 
    mapa.width, 
    mapa.height
  )

  personajeJugadorObjeto.pintarPersonaje()
  enviarPosicion(personajeJugadorObjeto.x, personajeJugadorObjeto.y)

  personajesEnemigos.forEach(function (personaje){
    personaje.pintarPersonaje()
    revisarColision(personaje)
  })
}

//ENVIAR POSICION JUGADOR agregamos una funcion que permite leer las coordenadas del jugador
function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/munpower/${jugadorId}/posicion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })
  //recibe el array enemigos desde back
  .then(function (res){
    if(res.ok) {
        res.json()
      //devuelve un objeto json a Back con los enemigos
      .then(function ({enemigos}){
        console.log(enemigos)  
        personajesEnemigos = enemigos.map(function (enemigo) {
            let personajeEnemigo = null
            const personajeNombre = enemigo.personaje.nombre || ""
            
              if (personajeNombre === "Trump"){
                personajeEnemigo = new Personaje("Trump", "./assets/img/trump.png", 5, "./assets/img/trump.png", enemigo.id)
              } else if (personajeNombre === "Putin"){
                personajeEnemigo = new Personaje("Putin", "./assets/img/putin.png", 5, "./assets/img/putin.png", enemigo.id)
              } else if (personajeNombre === "Jinping"){
                personajeEnemigo = new Personaje("Jinping", "./assets/img/jinping.png", 5, "./assets/img/jinping.png", enemigo.id)
              } else if (personajeNombre === "Jong-un"){
                personajeEnemigo = new Personaje("Jong-un", "./assets/img/jong_un.png", 5, "./assets/img/jong_un.png", enemigo.id)
              } else if (personajeNombre === "Maduro"){
                personajeEnemigo = new Personaje("Maduro", "./assets/img/maduro.png", 5, "./assets/img/maduro.png", enemigo.id)
              } else {
                personajeEnemigo = new Personaje("Bukele", "./assets/img/bukele.png", 5, "./assets/img/bukele.png", enemigo.id)
              }     
            //lee las coordenadas del enemigo
            personajeEnemigo.x = enemigo.x
            personajeEnemigo.y = enemigo.y

            return personajeEnemigo
        })    
      })  
    }          
  })
}

function moverDerecha() {
  // const personajeJugadorObjeto = obtenerObjetoPersonaje()
  personajeJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
  // const personajeJugadorObjeto = obtenerObjetoPersonaje()
  personajeJugadorObjeto.velocidadX = -5
}

function moverArriba() {
  // const personajeJugadorObjeto = obtenerObjetoPersonaje()
  personajeJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
  // const personajeJugadorObjeto = obtenerObjetoPersonaje()
  personajeJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
  // const personajeJugadorObjeto = obtenerObjetoPersonaje()
  personajeJugadorObjeto.velocidadX = 0
  personajeJugadorObjeto.velocidadY = 0
}

function presionarTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba()
      break
    case "ArrowDown":
      moverAbajo()
      break
    case "ArrowLeft":
      moverIzquierda()
      break
    case "ArrowRight":
      moverDerecha()
      break
    default:
      break
  }
}

function iniciarMapa() {
  personajeJugadorObjeto = obtenerObjetoPersonaje(personajeJugador)
  intervalo = setInterval(pintarCanvas, 50)
  window.addEventListener("keydown", presionarTecla)
  window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoPersonaje() {
  for (let i = 0; i < personajes.length; i++) {
    if (personajeJugador === personajes[i].nombre) {
      return personajes[i]
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x

  const arribaPersonaje = personajeJugadorObjeto.y
  const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
  const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
  const izquierdaPersonaje = personajeJugadorObjeto.x

  if (
    abajoPersonaje < arribaEnemigo ||
    arribaPersonaje > abajoEnemigo ||
    derechaPersonaje < izquierdaEnemigo ||
    izquierdaPersonaje > derechaEnemigo
  ) {
    return
  }
  detenerMovimiento()
  clearInterval(intervalo)

  enemigoId = enemigo.id
  seccionSeleccionarAtaque.style.display = "flex"
  seleccionarPersonajeEnemigo(enemigo)
  seccionVerMapa.style.display = "none"
}

//Esta línea le manda esperar a que cargue toda la página web para ejecutar la lógica JS
window.addEventListener("load", iniciarJuego)

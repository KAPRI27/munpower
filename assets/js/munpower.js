//ARCHIVO CON FRONTEND JS AVANZADO
///** FUNCION INICIARJUEGO */
const resultadoFinal = document.getElementById("seccion_mensaje_final")
const botonReiniciarJuego = document.getElementById("seccion_reiniciar")
const botonMascotaJugador = document.getElementById("boton_mascota")
const botonReiniciar = document.getElementById("boton_reiniciar")

///** FUNCION SELECCIONARMASCOTAJUGADOR */
const seccionSeleccionarMascota = document.getElementById(  "seleccionar_mascota")
const seccionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
let spanMascotaJugador = document.getElementById("mascota_jugador")
let spanMascotaEnemigo = document.getElementById("mascota_enemigo")

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
// const ataquesMokeponEnemigo = document.getElementById

//** SECCION MAPA
const seccionVerMapa = document.getElementById("ver_mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let personajes = []
let personajesEnemigos = []
// let personajeEnemigo = null
let opcionDeMokepones
let inputShakira
let inputPique
let inputClara
let inputCazzu
let inputNodal
let inputAngela
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let mascotaJugador
let mascotaJugadorObjeto
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

// CLASE CONSTRUCTOR MOKEPON
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

// OBJETOS MOKEPONES JUGADOR
let shakira = new Personaje("Shakira", "./assets/img/shakira.png", 5, "./assets/img/shakira.png")
let pique = new Personaje("Pique", "./assets/img/pique.png", 5, "./assets/img/pique.png")
let clara = new Personaje("Clara", "./assets/img/clara.png", 5, "./assets/img/clara.png")
let cazzu = new Personaje("Cazzu", "./assets/img/cazzu.png", 5, "./assets/img/cazzu.png")
let nodal = new Personaje("Nodal", "./assets/img/nodal.png", 5, "./assets/img/nodal.png")
let angela = new Personaje("Angela", "./assets/img/angela.png", 5, "./assets/img/angela.png")

// ATAQUES JUGADORES

const shakiraAtaques = [{ nombre: "AGUA 💧", id: "boton_agua" },
  { nombre: "FUEGO 🔥", id: "boton_fuego" },
  { nombre: "AGUA 💧", id: "boton_agua" },
  { nombre: "TIERRA 🌱", id: "boton_tierra" },
  { nombre: "AGUA 💧", id: "boton_agua" }]

const piqueAtaques = [{ nombre: "TIERRA 🌱", id: "boton_tierra" },
  { nombre: "FUEGO 🔥", id: "boton_fuego" },
  { nombre: "TIERRA 🌱", id: "boton_tierra" },
  { nombre: "AGUA 💧", id: "boton_agua" },
  { nombre: "TIERRA 🌱", id: "boton_tierra" }]

const claraAtaques = [{ nombre: "FUEGO 🔥", id: "boton_fuego" },
  { nombre: "AGUA 💧", id: "boton_agua" },
  { nombre: "FUEGO 🔥", id: "boton_fuego" },
  { nombre: "TIERRA 🌱", id: "boton_tierra" },
  { nombre: "FUEGO 🔥", id: "boton_fuego" }
]

const cazzuAtaques = [
  { nombre: "FUEGO 🔥", id: "boton_fuego"},
  { nombre: "FUEGO 🔥", id: "boton_fuego"},
  { nombre: "FUEGO 🔥", id: "boton_fuego"},
  { nombre: "AGUA 💧", id: "boton_agua"},
  { nombre: "TIERRA 🌱", id: "boton_tierra"}
]

const nodalAtaques = [
  { nombre: "AGUA 💧", id: "boton_agua"},
  { nombre: "TIERRA 🌱", id: "boton_tierra"},
  { nombre: "FUEGO 🔥", id: "boton_fuego"},
  { nombre: "TIERRA 🌱", id: "boton_tierra"},
  { nombre: "TIERRA 🌱", id: "boton_tierra"}
]

  const angelaAtaques = [
    { nombre: "FUEGO 🔥", id: "boton_fuego"},
  { nombre: "TIERRA 🌱", id: "boton_tierra"},
  { nombre: "AGUA 💧", id: "boton_agua"},
  { nombre: "AGUA 💧", id: "boton_agua"},
  { nombre: "AGUA 💧", id: "boton_agua"}
]

shakira.ataques.push(...shakiraAtaques)
pique.ataques.push(...piqueAtaques)
clara.ataques.push(...claraAtaques)
cazzu.ataques.push(...cazzuAtaques)
nodal.ataques.push(...nodalAtaques)
angela.ataques.push(...angelaAtaques)

// METEMOS LOS OBJETOS MOKEPON EN EL ARRAY MOKEPONES
personajes.push(
  shakira,
  pique,
  clara,
  cazzu,
  nodal,
  angela
)

//FUNCIÓN iniciarJuego  -  PARA INICIAR EL JUEGO
function iniciarJuego() {
  //ESCONDER SECCIÓN "ATAQUE" MIENTRAS NO SE ELIJA LA MASCOTA
  seccionSeleccionarAtaque.style.display = "none"
  //OCULTAR SECCION MAPA
  seccionVerMapa.style.display = "none"
  //ESCONDER SECCIÓN "ATAQUE" MIENTRAS NO SE ELIJA LA MASCOTA
  resultadoFinal.style.display = "none"
  //ESCONDER SECCIÓN "DETALLE BATALLAS" MIENTRAS NO COMIENCE BATALLA
  seccionDetallesBatallas.style.display = "none"
  //ESCONDE BOTÓN "REINICIAR" MIENTRAS NO TERMINE EL JUEGO
  botonReiniciarJuego.style.display = "none"

  //SE CREA EL EVENTO 'CLICK' PARA SELECCIONAR MASCOTA
  personajes.forEach((personaje) => {
    opcionDeMokepones = `
        <input type="radio" name="mascota" id="${personaje.nombre}"/>
        <label  class="card_mascota" for="${personaje.nombre}">
        <img src="${personaje.foto}" alt="${personaje.nombre}" >
        <h4>${personaje.nombre}</h4>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputShakira = document.getElementById("Shakira")
    inputPique = document.getElementById("Pique")
    inputClara = document.getElementById("Clara")
    inputCazzu = document.getElementById("Cazzu")
    inputNodal = document.getElementById("Nodal")
    inputAngela = document.getElementById("Angela")
  })
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
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

//FUNCION seleccionarMascotaJugador
//AL FINALIZAR LLAMA FUNCION - FETCH seleccionarMokepon
function seleccionarMascotaJugador() {
 
  //TEXTO DE LA MASCOTA QUE ELEGISTE
  if (inputShakira.checked) {
      spanMascotaJugador.innerHTML = inputShakira.id
      mascotaJugador = inputShakira.id
    } else if (inputPique.checked) {
      spanMascotaJugador.innerHTML = inputPique.id
      mascotaJugador = inputPique.id
    } else if (inputClara.checked) {
      spanMascotaJugador.innerHTML = inputClara.id
      mascotaJugador = inputClara.id
    } else if (inputCazzu.checked) {
      spanMascotaJugador.innerHTML = inputCazzu.id
      mascotaJugador = inputCazzu.id
    } else if (inputNodal.checked) {
      spanMascotaJugador.innerHTML = inputNodal.id
      mascotaJugador = inputNodal.id
    } else if (inputAngela.checked) {
      spanMascotaJugador.innerHTML = inputAngela.id
      mascotaJugador = inputAngela.id
    } else {
      alert("SELECCIONA UNA MASCOTA")
      return
  }
   //ESCONDER SECCIÓN "MASCOTAS"  MIENTRAS NO SE ELIJA LA MASCOTA
  seccionSeleccionarMascota.style.display = "none"
  //MOSTRAR SECCION MAPA
  seccionVerMapa.style.display = "flex"

  seleccionarPersonaje(mascotaJugador)
  extraerAtaques(mascotaJugador)
  iniciarMapa()
}

//FUNCION FETCH seleccionarMokepon - ESTA FUNCIÓN ENVÍA EL MOKEPON SELECCIONADO AL BACKEND
function seleccionarPersonaje(mascotaJugador) {
  fetch(`http://localhost:8080/munpower/${jugadorId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personaje: mascotaJugador
    })
  })
}

//FUNCION EXTRAER ATAQUES
function extraerAtaques(mascotaJugador) {
  let ataques
  for (let i = 0; i < personajes.length; i++) {
    if (mascotaJugador === personajes[i].nombre) {
      ataques = personajes[i].ataques
    }
  }
  mostrarAtaques(ataques)
}

//FUNCION MOSTRAR ATAQUES
function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
          <button id="${ataque.id}" class="btn-ataque BAtaque">${ataque.nombre}</button>
        `
    contenedorAtaques.innerHTML += ataquesMokepon
  })
  // botonFuego = document.getElementById("boton_fuego")
  // botonAgua = document.getElementById("boton_agua")
  // botonTierra = document.getElementById("boton_tierra")
  botones = document.querySelectorAll(".BAtaque")
}

//FUNCION secuenciaAtaques
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "FUEGO 🔥") {
        ataqueJugador.push("FUEGO 🔥")
        console.log(ataqueJugador)
        boton.style.background = "#112f58"
        boton.disabled = true
      } else if (e.target.textContent === "AGUA 💧") {
        ataqueJugador.push("AGUA 💧")
        console.log(ataqueJugador)
        boton.style.background = "#112f58"
        boton.disabled = true
      } else {
        ataqueJugador.push("TIERRA 🌱")
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
function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre
  ataquesMokeponEnemigo = enemigo.ataques
  //LLAMANDO FUNCION SECUENCIAATAQUES
  secuenciaAtaque()
  
}

//ATAQUES
//FUNCIÓN ATAQUE ALEATORIO DEL ENEMIGO
function ataqueAleatorioEnemigo() {
  // console.log('Ataques enemigo', ataquesMokeponEnemigo)
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO 🔥")
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA 💧")
  } else {
    ataqueEnemigo.push("TIERRA 🌱")
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
  //1 Fuego  FUEGO VENCE TIERRA   //2 Agua  AGUA VENCE FUEGO   //3 Tierra  TIERRA VENCE AGUA
  //APARECE SECCIÓN DETALLE DE LAS BATALLAS
  seccionDetallesBatallas.style.display = "flex"  //************************* */

  clearInterval(intervalo)
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index)
      crearMensaje("EMPATE 🤜🤛")
    } else if (ataqueJugador[index] === "FUEGO 🔥" && ataqueEnemigo[index] == "TIERRA 🌱") {
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE 🏆😎")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === "AGUA 💧" && ataqueEnemigo[index] == "FUEGO 🔥") {
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE 🏆😎")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === "TIERRA 🌱" && ataqueEnemigo[index] == "AGUA 💧") {
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE 🏆😎")
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else {indexAmbosOponentes(index, index)
      crearMensaje("PERDISTE 💔😢")
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
  }
  revisarVictorias()
}

function revisarVictorias() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("ES UN EMPATE 🤜🤛")
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("GANASTE 🥳🎉")
  } else {
    crearMensajeFinal("PERDISTE 🥺")
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
  location.reload(true)
}

//FUNCIÓN ALEATORIO (ELIGE MASCOTA Y ATAQUE ENEMIGO)
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//SE CREA MAPA Y SE PINTA PERSONAJE EN ESTAS COORDENADAS
function pintarCanvas() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBackground, 
    0, 
    0, 
    mapa.width, 
    mapa.height
  )

  mascotaJugadorObjeto.pintarMokepon()
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

  personajesEnemigos.forEach(function (personaje){
    personaje.pintarMokepon()
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
            
              if (personajeNombre === "shakira"){
              personajeEnemigo = new Mokepon("Shakira", "./assets/img/shakira.png", 5, "./assets/img/shakira.png", enemigo.id)
              } else if (personajeNombre === "Pique"){
                personajeEnemigo = new Mokepon("Pique", "./assets/img/pique.png", 5, "./assets/img/pique.png", enemigo.id)
              } else if (personajeNombre === "Clara"){
                personajeEnemigo = new Mokepon("Clara", "./assets/img/clara.png", 5, "./assets/img/clara.png", enemigo.id)
              } else if (personajeNombre === "Cazzu"){
                personajeEnemigo = new Mokepon("Cazzu", "./assets/img/cazzu.png", 5, "./assets/img/cazzu.png", enemigo.id)
              } else if (personajeNombre === "Nodal"){
                personajeEnemigo = new Mokepon("Nodal", "./assets/img/nodal.png", 5, "./assets/img/nodal.png", enemigo.id)
              } else {
                personajeEnemigo = new Mokepon("Angela", "./assets/img/angela.png", 5, "./assets/img/angela.png", enemigo.id)
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
  // const mascotaJugadorObjeto = obtenerObjetoMascota()
  mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
  // const mascotaJugadorObjeto = obtenerObjetoMascota()
  mascotaJugadorObjeto.velocidadX = -5
}

function moverArriba() {
  // const mascotaJugadorObjeto = obtenerObjetoMascota()
  mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
  // const mascotaJugadorObjeto = obtenerObjetoMascota()
  mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
  // const mascotaJugadorObjeto = obtenerObjetoMascota()
  mascotaJugadorObjeto.velocidadX = 0
  mascotaJugadorObjeto.velocidadY = 0
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
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
  intervalo = setInterval(pintarCanvas, 50)
  window.addEventListener("keydown", presionarTecla)
  window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
  for (let i = 0; i < personajes.length; i++) {
    if (mascotaJugador === personajes[i].nombre) {
      return personajes[i]
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x

  const arribaMascota = mascotaJugadorObjeto.y
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
  const izquierdaMascota = mascotaJugadorObjeto.x

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return
  }
  detenerMovimiento()
  clearInterval(intervalo)

  enemigoId = enemigo.id
  seccionSeleccionarAtaque.style.display = "flex"
  seleccionarMascotaEnemigo(enemigo)
  seccionVerMapa.style.display = "none"
}

//Esta línea le manda esperar a que cargue toda la página web para ejecutar la lógica JS
window.addEventListener("load", iniciarJuego)

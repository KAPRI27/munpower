//IMPORTAMOS EXPRESS Y LA GUARDAMOS EN LA VARIABLE LLAMADA EXPRESS
const express = require("express")
const cors = require("cors")

//CREAMOS LA APLICACIÓN CON EXPRESS
const app = express()

// app.use(express.static("static"))
app.use(cors())
app.use(express.json())

//ARRAYJUGADORES
let jugadores = []

//CLASE CONSTRUCTORA JUGADOR
class Jugador {
  constructor(id) {
    this.id = id
  }

  //asignar personaje
  asignarPersonaje(personaje) {
    this.personaje = personaje
  }

  actualizarPosicion(x, y) {
    this.x = x
    this.y = y
  }

  asignarAtaques(ataques){
    this.ataques = ataques
  }
}

//CLASE CONSTRUCTORA MOKEPON
class Personaje {
  constructor(nombre) {
    this.nombre = nombre
  }
}

//ENDPOINT inicial
// app.get("/", (req, res) => {
//   res.send("Hola Enfermera")
// })

//SOLICITUD GET UNIRSE
app.get("/unirse", (req, res) => {
  //LE ASIGNAMOS UN ID RANDOM AL JUGADOR
  const id = `${Math.random()}`
  //CREAMOS EL JUGADOR CON EL NUEVO id
  const jugador = new Jugador(id)
  //AGREGAMOS EL JUGADOR A LA LISTA DE JUGADORES
  jugadores.push(jugador)

  //ESTO ES LO QUE SE ENVÍA A FRONTEND Y TAMBN LO QUE SE RENDERIZA EN LA PAGINA WEB
  res.send(id)
})

//URL ID JUGADOR
app.post("/munpower/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const nombre = req.body.personaje || ""
  const personaje = new Personaje(nombre)

  //buscar al jugador con ese id, primero validamos que exista con findIndex, si existe nos regresa el nro de lista
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  //ahora verificamos si el index es mayor que cero
  if (jugadorIndex >= 0) {jugadores[jugadorIndex].asignarPersonaje(personaje)}

  //MOSTRAMOS JUGADORES
  console.log(jugadores)
  //MOSTRAMOS EL ID
  console.log(jugadorId)
  //MOSTRAMOS EL PERSONAJE ELEGIDO
  // console.log(personaje)

  //TERMINAMOS LA PETICIÓN
  res.end()
})

//ENVIAR POSICION DE PERSONAJE
app.post("/munpower/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y)
  }

  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
  res.send({
    enemigos
  })
})

app.post("/munpower/:jugadorId/ataques", (req, res) =>{
  const jugadorId = req.params.jugadorId || ""
  const ataques = req.body.ataques || []

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if(jugadorIndex >= 0){
    jugadores[jugadorIndex].asignarAtaques(ataques)
  }
  res.end()
})

app.get("/munpower/:jugadorId/ataques", (req, res) =>{
  const jugadorId = req.params.jugadorId || ""
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId)

  res.send({
    ataques: jugador.ataques || []
  })
})

//ESCUCHANDO EL SERVIDOR
app.listen(8080, () => {
  console.log("Servidor Sirviendo xD")
})

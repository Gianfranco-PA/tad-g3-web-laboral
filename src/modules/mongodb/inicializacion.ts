import { connect, connection } from 'mongoose'
import Credencial from './schema/credencialModel'
import Empresa from './schema/empresaModel'
import Oferta from './schema/ofertaModel'
import Persona from './schema/personaModel'

const conn = {
  isConnected: 0,
}

export async function dbConnect() {
  if (conn.isConnected == 1) return
  const db = await connect(process.env.MONGODB_URI!)
  conn.isConnected = db.connection.readyState
  Credencial.init()
  Empresa.init()
  Persona.init()
  Oferta.init()
}

connection.on('connected', () => {
  console.log('Conectado a MongoDB')
})

connection.on('error', (err) => {
  console.log(err)
})

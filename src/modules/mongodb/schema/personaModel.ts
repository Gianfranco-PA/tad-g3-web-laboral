import { Schema, model, models, InferSchemaType } from 'mongoose'

const personaSchema = new Schema({
  nombre: { type: 'string' },
  apellido: { type: 'string' },
  correo: { type: 'string' },
  contrasenia: { type: 'string' },
  celular: { type: 'number' },
})

const Persona = models.Persona || model('Persona', personaSchema)

export default Persona

export type PersonaType = InferSchemaType<typeof Persona>

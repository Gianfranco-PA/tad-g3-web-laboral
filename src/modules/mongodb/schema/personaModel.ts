import { Schema, model, models, InferSchemaType, Types } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
import { CredencialType } from './credencialModel'

export const personaSchema = new Schema({
  nombre: { type: 'string' },
  apellido: { type: 'string' },
  celular: { type: 'string' },
  dni: { type: 'string' },
  sexo: { type: 'string' },
  fNacimiento: { type: 'string' },
  direccion: { type: 'string' },
  ciudad: { type: 'string' },
  credenciales: {
    type: Schema.Types.ObjectId,
    ref: 'credenciale',
    autopopulate: true,
  },
})

personaSchema.plugin(autopopulate)

const Persona = models.persona || model('persona', personaSchema)

export default Persona

export type PersonaTypePrimitive = InferSchemaType<typeof personaSchema>

export type PersonaTypeData = Omit<PersonaTypePrimitive, 'credenciales'> & {
  _id?: Types.ObjectId
  credenciales?: CredencialType
}

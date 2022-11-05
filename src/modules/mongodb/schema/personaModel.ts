import { Schema, model, models, InferSchemaType } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const personaSchema = new Schema({
  nombre: { type: 'string' },
  apellido: { type: 'string' },
  credenciales: {
    type: Schema.Types.ObjectId,
    ref: 'credenciale',
    autopopulate: true,
  },
  celular: { type: 'number' },
})

personaSchema.plugin(autopopulate)

const Persona = models.persona || model('persona', personaSchema)

export default Persona

export type PersonaType = InferSchemaType<typeof personaSchema>

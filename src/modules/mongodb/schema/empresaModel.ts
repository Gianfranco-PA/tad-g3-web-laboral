import { Schema, model, models, InferSchemaType } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const empresaSchema = new Schema({
  nombre_empresa: { type: 'string', require: true },
  ruc: { type: 'string', require: true },
  direccion: { type: 'string', require: true },
  ciudad: { type: 'string', require: true },
  rubro: { type: 'string', require: true },
  nombre_contacto: { type: 'string', require: true },
  apellidos: { type: 'string', require: true },
  celular: { type: 'string', require: true },
  credenciales: {
    type: Schema.Types.ObjectId,
    ref: 'credenciale',
    autopopulate: true,
    require: true,
  },
})

empresaSchema.plugin(autopopulate)

const Empresa = models.empresa || model('empresa', empresaSchema)

export default Empresa

export type EmpresaType = InferSchemaType<typeof empresaSchema>

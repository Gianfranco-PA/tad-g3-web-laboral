import { Schema, model, models, InferSchemaType, Types } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
import { CredencialType } from './credencialModel'

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

export type EmpresaTypePrimitive = InferSchemaType<typeof empresaSchema>

export type EmpresaTypeData = Omit<EmpresaTypePrimitive, 'credenciales'> & {
  _id?: Types.ObjectId
  credenciales?: CredencialType
}

import { Schema, model, models, InferSchemaType } from 'mongoose'

const empresaSchema = new Schema({
  nombre: { type: 'string' },
  ruc: { type: 'string' },
  correo: { type: 'string' },
  contrasenia: {type: 'string'},
  celular: { type: 'string' },
})

const Empresa = models.Empresa || model('Empresa', empresaSchema)

export default Empresa

export type EmpresaType = InferSchemaType<typeof Empresa>

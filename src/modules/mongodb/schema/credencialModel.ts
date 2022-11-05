import { Schema, model, models, InferSchemaType } from 'mongoose'

const credencialSchema = new Schema({
  correo: { type: 'string' },
  contrasenia: { type: 'string' },
})

const Credencial = models.credenciale || model('credenciale', credencialSchema)

export default Credencial

export type CredencialType = InferSchemaType<typeof credencialSchema>

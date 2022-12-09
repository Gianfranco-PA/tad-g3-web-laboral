import { Schema, model, models, InferSchemaType, Types } from 'mongoose'

const credencialSchema = new Schema({
  correo: { type: 'string' },
  contrasenia: { type: 'string' },
})

const Credencial = models.credenciale || model('credenciale', credencialSchema)

export default Credencial

export type CredencialType = InferSchemaType<typeof credencialSchema> & {
  _id?: Types.ObjectId
}

export function isCredencial(arg: any): arg is CredencialType {
  return (
    arg &&
    arg.correo &&
    arg.contrasenia &&
    typeof arg.correo == 'string' &&
    typeof arg.contrasenia == 'string'
  )
}

import { Schema, model, models, InferSchemaType, Types } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const ofertaSchema = new Schema({
  titulo: { type: 'string' },
  descripcion: { type: 'string' },
  fecha_publicacion: { type: 'string' },
  empresa: { type: Schema.Types.ObjectId, ref: 'empresa', autopopulate: true },
})

ofertaSchema.plugin(autopopulate)

const Oferta = models.oferta || model('oferta', ofertaSchema)

export default Oferta

export type OfertaType = InferSchemaType<typeof ofertaSchema> & {
  _id?: Types.ObjectId
}

export function isOferta(arg: any): arg is OfertaType {
  return (
    arg &&
    arg.titulo &&
    arg.descripcion &&
    arg.fecha_publicacion &&
    arg.empresa &&
    typeof arg.titulo == 'string' &&
    typeof arg.descripcion == 'string' &&
    typeof arg.fecha_publicacion == 'string' &&
    typeof arg.empresa == 'string'
  )
}

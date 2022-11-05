import { Schema, model, models, InferSchemaType } from 'mongoose'
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

export type OfertaType = InferSchemaType<typeof ofertaSchema>

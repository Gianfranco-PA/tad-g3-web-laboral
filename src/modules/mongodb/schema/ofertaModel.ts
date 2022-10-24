import { Schema, model, models, InferSchemaType } from 'mongoose'

const ofertaSchema = new Schema({
  titulo: { type: 'string' },
  descripcion: { type: 'string' },
  fecha_publicacion: { type: 'string' },
  empresa: { type: Schema.Types.ObjectId, ref: 'Empresa', autopopulate: true },
})

const Oferta = models.Oferta || model('Oferta', ofertaSchema)

export default Oferta

export type OfertaType = InferSchemaType<typeof Oferta>

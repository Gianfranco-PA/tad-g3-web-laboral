import { Schema, model, models, InferSchemaType, Types } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
import { EmpresaTypeData } from './empresaModel'
import { personaSchema, PersonaTypeData } from './personaModel'

const ofertaSchema = new Schema({
  titulo: { type: 'string' },
  conocimientos: { type: 'string' },
  estudios_minimos: { type: 'string' },
  idioma: { type: 'string' },
  lugar: { type: 'string' },
  puesto: { type: 'string' },
  area: { type: 'string' },
  jornada_laboral: { type: 'string' },
  fecha_publicacion: { type: 'string' },
  postulantes: [
    { type: Schema.Types.ObjectId, ref: 'persona', autopopulate: true },
  ],
  empresa: { type: Schema.Types.ObjectId, ref: 'empresa', autopopulate: true },
})

ofertaSchema.plugin(autopopulate)

const Oferta = models.oferta || model('oferta', ofertaSchema)

export default Oferta

export type OfertaTypePrimitive = InferSchemaType<typeof ofertaSchema> & {
  _id?: Types.ObjectId
}

export type OfertaTypeData = Omit<
  OfertaTypePrimitive,
  'empresa' | 'postulantes'
> & {
  empresa?: EmpresaTypeData
  postulantes: Array<PersonaTypeData>
}

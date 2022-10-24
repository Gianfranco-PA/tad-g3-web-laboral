import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Oferta, { OfertaType } from 'src/modules/mongodb/schema/ofertaModel'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfertaType>,
) {
  const {
    method,
    body,
    query: { id },
  } = req
  switch (method) {
    case 'GET':
      try {
        const oneOferta = await Oferta.findById(id)
        if (!oneOferta)
          return res.status(404).json({ msg: 'No se encontro el Dato' })
        return res.status(200).json(oneOferta)
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    case 'PUT':
      try {
        const one = await Oferta.findByIdAndUpdate(id, body, {
          new: true,
        })
        if (!one) return res.status(404).json({ msg: 'No se encontro el Dato' })
        return res.status(200).json(one)
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    case 'DELETE':
      try {
        const one = await Oferta.findByIdAndDelete(id)
        if (!one) return res.status(404).json({ msg: 'No se encontro el Dato' })
        return res.status(204).json({ msg: 'Se elimino correctamente' })
      } catch (error) {
        const msg = (error as Error).message
        return res.status(400).json({ msg })
      }
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

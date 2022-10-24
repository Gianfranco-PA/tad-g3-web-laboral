import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Oferta, { OfertaType } from 'src/modules/mongodb/schema/ofertaModel'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfertaType>,
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const allOferta = await Oferta.find()
        return res.status(200).json(allOferta)

        //return res.status(200).json({ msg: 'Hola' })
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    case 'POST':
      try {
        const newOferta = new Oferta(body)
        //newData.id = new Types.ObjectId()
        const savedOferta = await newOferta.save()
        return res.status(201).json(savedOferta)
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Persona, { PersonaType } from 'src/modules/mongodb/schema/personaModel'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PersonaType>,
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const allPersona = await Persona.find()
        return res.status(200).json(allPersona)

        //return res.status(200).json({ msg: 'Hola' })
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    case 'POST':
      try {
        const newPersona = new Persona(body)
        //newData.id = new Types.ObjectId()
        const savedPersona = await newPersona.save()
        return res.status(201).json(savedPersona)
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

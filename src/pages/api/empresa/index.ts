import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Empresa, { EmpresaType } from 'src/modules/mongodb/schema/empresaModel'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmpresaType>,
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const allEmpresa = await Empresa.find()
        return res.status(200).json(allEmpresa)

        //return res.status(200).json({ msg: 'Hola' })
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    case 'POST':
      try {
        const newEmpresa = new Empresa(body)
        //newData.id = new Types.ObjectId()
        const savedEmpresa = await newEmpresa.save()
        return res.status(201).json(savedEmpresa)
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

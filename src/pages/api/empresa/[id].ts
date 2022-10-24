import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Empresa, { EmpresaType } from 'src/modules/mongodb/schema/empresaModel'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmpresaType>,
) {
  const {
    method,
    body,
    query: { id },
  } = req
  switch (method) {
    case 'GET':
      try {
        const oneEmpresa = await Empresa.findById(id)
        if (!oneEmpresa)
          return res.status(404).json({ msg: 'No se encontro el Dato' })
        return res.status(200).json(oneEmpresa)
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    case 'PUT':
      try {
        const one = await Empresa.findByIdAndUpdate(id, body, {
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
        const one = await Empresa.findByIdAndDelete(id)
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

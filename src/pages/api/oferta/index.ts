import type { NextApiRequest, NextApiResponse } from 'next'
import {
  obtenerOfertas,
  registrarOferta,
} from 'src/common/utils/crudMetodos/ofertaMetodos'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      const ofertas = await obtenerOfertas()
      const jsonGet = 'data' in ofertas ? ofertas.data : ofertas.msg
      return res.status(ofertas.status).json(jsonGet)
    case 'POST':
      const { oferta } = body
      if (!oferta)
        return res
          .status(404)
          .json({ msg: 'Los datos requeridos estan incompletos' })

      const result = await registrarOferta(oferta)
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import OfertaDAO from 'src/common/utils/crudMetodos/ofertaDAO'
import ValidationOfertaDAO from 'src/common/utils/crudMetodos/validationOferta'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  const dao = new ValidationOfertaDAO(new OfertaDAO())
  switch (method) {
    case 'GET':
      const ofertas = await dao.read()
      const jsonGet = 'data' in ofertas ? ofertas.data : ofertas.msg
      return res.status(ofertas.status).json(jsonGet)
    case 'POST':
      const result = await dao.create(body)
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

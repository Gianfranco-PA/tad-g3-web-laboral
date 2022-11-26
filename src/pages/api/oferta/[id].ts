import { NextApiRequest, NextApiResponse } from 'next'
import OfertaDAO from 'src/common/utils/crudMetodos/ofertaDAO'
import ValidationOfertaDAO from 'src/common/utils/crudMetodos/validationOferta'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    method,
    body,
    query: { id },
  } = req
  const dao = new ValidationOfertaDAO(new OfertaDAO())
  switch (method) {
    case 'GET':
      const encontrado = await dao.read(id)
      const jsonGet = 'data' in encontrado ? encontrado.data : encontrado.msg
      return res.status(encontrado.status).json(jsonGet)
    case 'PUT':
      const result = await dao.update({ oferta: body, id: id })
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    case 'DELETE':
      const respuesta = await dao.delete({id})
      const jsonRes = 'data' in respuesta ? respuesta.data : respuesta.msg
      return res.status(respuesta.status).json(jsonRes)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

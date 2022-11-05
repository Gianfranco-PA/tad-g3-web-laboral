import { NextApiRequest, NextApiResponse } from 'next'
import {
  actualizarEmpresa,
  eliminarEmpresa,
  empresaPorId,
} from 'src/common/utils/crudMetodos/empresaMetodos'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    method,
    body,
    query: { id },
  } = req
  switch (method) {
    case 'GET':
      const encontrado = await empresaPorId(id as string)
      const jsonGet = 'data' in encontrado ? encontrado.data : encontrado.msg
      return res.status(encontrado.status).json(jsonGet)
    case 'PUT':
      const { persona } = body
      const result = await actualizarEmpresa(body.id, persona)
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    case 'DELETE':
      const respuesta = await eliminarEmpresa(body.id)
      const jsonRes = 'data' in respuesta ? respuesta.data : respuesta.msg
      return res.status(respuesta.status).json(jsonRes)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

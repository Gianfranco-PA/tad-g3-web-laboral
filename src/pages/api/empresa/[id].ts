import { NextApiRequest, NextApiResponse } from 'next'
import EmpresaDAO from 'src/common/utils/crudMetodos/empresaDAO'
import ValitaditionEmpresaDAO from 'src/common/utils/crudMetodos/validationEmpresa'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    method,
    body,
    query: { id },
  } = req
  const empresaDao = new ValitaditionEmpresaDAO(new EmpresaDAO())
  switch (method) {
    case 'GET':
      const encontrado = await empresaDao.read(id as string)
      const jsonGet = 'data' in encontrado ? encontrado.data : encontrado.msg
      return res.status(encontrado.status).json(jsonGet)
    case 'PUT':
      const result = await empresaDao.update({ empresa: body, id: id })
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    case 'DELETE':
      const respuesta = await empresaDao.delete({ id })
      const jsonRes = 'data' in respuesta ? respuesta.data : respuesta.msg
      return res.status(respuesta.status).json(jsonRes)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

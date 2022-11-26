import { NextApiRequest, NextApiResponse } from 'next'
import PersonaDAO from 'src/common/utils/crudMetodos/personaDAO'
import ValitaditionPersonaDAO from 'src/common/utils/crudMetodos/validationPersona'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    method,
    body,
    query: { id },
  } = req
  const personaDao = new ValitaditionPersonaDAO(new PersonaDAO())
  switch (method) {
    case 'GET':
      const encontrado = await personaDao.read(id as string)
      const jsonGet = 'data' in encontrado ? encontrado.data : encontrado.msg
      return res.status(encontrado.status).json(jsonGet)
    case 'PUT':
      const result = await personaDao.update({ persona: body, id: id })
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    case 'DELETE':
      const respuesta = await personaDao.delete({ id })
      const jsonRes = 'data' in respuesta ? respuesta.data : respuesta.msg
      return res.status(respuesta.status).json(jsonRes)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import PersonaDAO from 'src/common/utils/crudMetodos/personaDAO'
import ValitaditionPersonaDAO from 'src/common/utils/crudMetodos/validationPersona'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  switch (method) {
    case 'POST':
      let dao = new PersonaDAO()
      dao = new ValitaditionPersonaDAO(dao)
      const post = await dao.create(body)
      const json = 'data' in post ? post.data : post.msg
      return res.status(post.status).json(json)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

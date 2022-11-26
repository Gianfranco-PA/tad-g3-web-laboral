import type { NextApiRequest, NextApiResponse } from 'next'
import EmpresaDAO from 'src/common/utils/crudMetodos/empresaDAO'
import ValitaditionEmpresaDAO from 'src/common/utils/crudMetodos/validationEmpresa'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  switch (method) {
    case 'POST':
      let dao = new EmpresaDAO()
      dao = new ValitaditionEmpresaDAO(dao)
      const post = await dao.create(body)
      const json = 'data' in post ? post.data : post.msg
      return res.status(post.status).json(json)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

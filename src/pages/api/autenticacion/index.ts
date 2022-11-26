import type { NextApiRequest, NextApiResponse } from 'next'
import AutenticacionUsuario from 'src/common/utils/crudMetodos/autenticacion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  switch (method) {
    case 'POST':
      const aut = new AutenticacionUsuario()
      const result = await aut.getUsuario(body)
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

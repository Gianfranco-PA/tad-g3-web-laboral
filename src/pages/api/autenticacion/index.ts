import type { NextApiRequest, NextApiResponse } from 'next'
import { obtenerUsuario } from 'src/common/utils/crudMetodos/autenticacionMetodos'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  switch (method) {
    case 'POST':
      const { credenciales } = body
      if (!('correo' in credenciales && 'contrasenia' in credenciales)) {
        return res.status(400).json({ msg: 'No se cumplio con los requisitos' })
      }
      const result = await obtenerUsuario(credenciales)
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

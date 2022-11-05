import type { NextApiRequest, NextApiResponse } from 'next'
import { registrarEmpresa } from 'src/common/utils/crudMetodos/empresaMetodos'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  switch (method) {
    // case 'GET':
    //   try {
    //     const { correo, contrasenia } = body
    //     const allEmpresa = await Empresa.find({ correo, contrasenia })
    //     return res.status(200).json(allEmpresa)

    //     //return res.status(200).json({ msg: 'Hola' })
    //   } catch (error) {
    //     const msg = (error as Error).message
    //     return res.status(500).json({ msg })
    //   }
    case 'POST':
      const { credenciales, empresa } = body
      if (!credenciales || !empresa)
        return res
          .status(404)
          .json({ msg: 'Los datos requeridos estan incompletos' })

      const result = await registrarEmpresa(credenciales, empresa)
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

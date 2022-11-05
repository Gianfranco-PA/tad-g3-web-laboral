import type { NextApiRequest, NextApiResponse } from 'next'
import { registrarPersona } from 'src/common/utils/crudMetodos/personaMetodos'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  switch (method) {
    // case 'GET':
    //   try {
    //     const { credenciales } = body
    //     const allCredenciales = await Credencial.findOne({ credenciales })
    //     const allPersona = await Persona.find({
    //       credenciales: allCredenciales._id,
    //     })
    //     return res.status(200).json(allPersona)

    //     //return res.status(200).json({ msg: 'Hola' })
    //   } catch (error) {
    //     const msg = (error as Error).message
    //     return res.status(500).json({ msg })
    //   }

    case 'POST':
      const { credenciales, persona } = body
      if (!credenciales || !persona)
        return res
          .status(404)
          .json({ msg: 'Los datos requeridos estan incompletos' })

      const result = await registrarPersona(credenciales, persona)
      const json = 'data' in result ? result.data : result.msg
      return res.status(result.status).json(json)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}

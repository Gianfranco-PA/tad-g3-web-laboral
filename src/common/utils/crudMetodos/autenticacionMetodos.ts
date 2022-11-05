import { identificarEmpresa } from './empresaMetodos'
import { identificarPersona } from './personaMetodos'
import { CompleteRequest, ErrorRequest } from 'src/common/types/apiTypes'
import { CredencialType } from 'src/modules/mongodb/schema/credencialModel'

export async function obtenerUsuario(
  credenciales: CredencialType,
): Promise<CompleteRequest | ErrorRequest> {
  const { correo, contrasenia } = credenciales
  let result = await identificarPersona({ correo, contrasenia })
  if ('msg' in result)
    if (result.status == 400) return result
    else result = await identificarEmpresa({ correo, contrasenia })
  return result
}

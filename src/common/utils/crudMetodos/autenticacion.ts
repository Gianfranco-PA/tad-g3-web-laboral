import { CredencialType } from 'src/modules/mongodb/schema/credencialModel'
import EmpresaDAO from './empresaDAO'
import PersonaDAO from './personaDAO'
import ValidationEmpresaDAO from './validationEmpresa'
import ValidationPersonaDAO from './validationPersona'

export default class AutenticacionUsuario {
  async getUsuario(datos: CredencialType) {
    let personaDao = new PersonaDAO()
    personaDao = new ValidationPersonaDAO(personaDao)
    let result = await personaDao.read(datos)
    if (result.status == 404) {
      let empresaDao = new EmpresaDAO()
      empresaDao = new ValidationEmpresaDAO(empresaDao)
      result = await empresaDao.read(datos)
    }
    return result
  }
}

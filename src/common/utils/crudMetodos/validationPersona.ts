import { CompleteRequest, DAO, ErrorRequest } from 'src/common/types/apiTypes'
import PersonaDAO, {
  createPersonaDAO,
  deletePersonaDAO,
  readPersonaDAO,
  updatePersonaDAO,
} from './personaDAO'

export default class ValitaditionPersonaDAO implements DAO {
  private service: PersonaDAO
  constructor(service: PersonaDAO) {
    this.service = service
  }
  private isCreateProps(arg: any): arg is createPersonaDAO {
    return (
      arg &&
      arg.credenciales &&
      arg.persona &&
      typeof arg.credenciales == 'object' &&
      typeof arg.persona == 'object'
    )
  }
  private isReadProps(arg: any): arg is readPersonaDAO {
    return !arg || typeof arg == 'string' || typeof arg == 'object'
  }
  private isUpdateProps(arg: any): arg is updatePersonaDAO {
    return (
      arg &&
      arg.id &&
      arg.persona &&
      typeof arg.id == 'string' &&
      typeof arg.persona == 'object'
    )
  }
  private isDeleteProps(arg: any): arg is deletePersonaDAO {
    return arg && arg.id && typeof arg.id == 'string'
  }

  async create(datos: any): Promise<CompleteRequest | ErrorRequest> {
    if (!this.isCreateProps(datos)) {
      return { status: 500, msg: 'Los datos enviados estan incompletos' }
    }
    return await this.service.create(datos)
  }
  async read(datos: any): Promise<CompleteRequest | ErrorRequest> {
    if (!this.isReadProps(datos)) {
      return { status: 500, msg: 'Los datos enviados estan incompletos' }
    }
    return await this.service.read(datos)
  }
  async update(datos: any): Promise<CompleteRequest | ErrorRequest> {
    if (!this.isUpdateProps(datos)) {
      return { status: 500, msg: 'Los datos enviados estan incompletos' }
    }
    return await this.service.update(datos)
  }
  async delete(datos: any): Promise<CompleteRequest | ErrorRequest> {
    if (!this.isDeleteProps(datos)) {
      return { status: 500, msg: 'Los datos enviados estan incompletos' }
    }
    return await this.service.delete(datos)
  }
}

import { CompleteRequest, DAO, ErrorRequest } from 'src/common/types/apiTypes'
import EmpresaDAO, {
  createEmpresaDAO,
  deleteEmpresaDAO,
  readEmpresaDAO,
  updateEmpresaDAO,
} from './empresaDAO'

export default class ValitaditionEmpresaDAO implements DAO {
  private service: EmpresaDAO
  constructor(service: EmpresaDAO) {
    this.service = service
  }
  private isCreateProps(arg: any): arg is createEmpresaDAO {
    return (
      arg &&
      arg.credenciales &&
      arg.empresa &&
      typeof arg.credenciales == 'object' &&
      typeof arg.empresa == 'object'
    )
  }
  private isReadProps(arg: any): arg is readEmpresaDAO {
    return !arg || typeof arg == 'string' || typeof arg == 'object'
  }
  private isUpdateProps(arg: any): arg is updateEmpresaDAO {
    return (
      arg &&
      arg.id &&
      arg.empresa &&
      typeof arg.id == 'string' &&
      typeof arg.empresa == 'object'
    )
  }
  private isDeleteProps(arg: any): arg is deleteEmpresaDAO {
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

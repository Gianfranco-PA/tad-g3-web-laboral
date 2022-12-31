import { CompleteRequest, DAO, ErrorRequest } from 'src/common/types/apiTypes'
import { isOfertaData, isOfertaPrimitive } from '../validations/oferta'
import OfertaDAO, {
  createOfertaDAO,
  deleteOfertaDAO,
  readOfertaDAO,
  updateOfertaDAO,
} from './ofertaDAO'

export default class ValidationOfertaDAO implements DAO {
  private service: OfertaDAO
  constructor(service: OfertaDAO) {
    this.service = service
  }
  private isCreateProps(arg: any): arg is createOfertaDAO {
    return arg && arg.oferta && isOfertaPrimitive(arg.oferta)
  }
  private isReadProps(arg: any | undefined): arg is readOfertaDAO {
    return !arg || typeof arg == 'string'
  }
  private isUpdateProps(arg: any): arg is updateOfertaDAO {
    return (
      arg &&
      arg.id &&
      arg.oferta &&
      typeof arg.id == 'string' &&
      isOfertaData(arg.oferta)
    )
  }
  private isDeleteProps(arg: any): arg is deleteOfertaDAO {
    return arg && arg.id && typeof arg.id == 'string'
  }

  async create(datos: any): Promise<CompleteRequest | ErrorRequest> {
    // console.log(datos)
    // console.log(Boolean(datos.oferta))
    // console.log(Boolean(isOfertaPrimitive(datos.oferta)))
    if (!this.isCreateProps(datos)) {
      return { status: 500, msg: 'Los datos enviados estan incompletos' }
    }
    return await this.service.create(datos)
  }
  async read(datos?: any): Promise<CompleteRequest | ErrorRequest> {
    if (!this.isReadProps(datos)) {
      return { status: 500, msg: 'Los datos enviados estan incompletos' }
    }
    return await this.service.read(datos)
  }
  async update(datos: any): Promise<CompleteRequest | ErrorRequest> {
    // console.log(datos)
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

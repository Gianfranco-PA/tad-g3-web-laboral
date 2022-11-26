export interface ErrorRequest {
  status: number
  msg: string
}

export interface CompleteRequest {
  status: number
  data: object
}

export interface DAO {
  create(datos: any): Promise<CompleteRequest | ErrorRequest>
  read(datos: any): Promise<CompleteRequest | ErrorRequest>
  update(datos: any): Promise<CompleteRequest | ErrorRequest>
  delete(datos: any): Promise<CompleteRequest | ErrorRequest>
}


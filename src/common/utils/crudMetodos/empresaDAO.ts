import mongoose, { Schema } from 'mongoose'
import { CompleteRequest, DAO, ErrorRequest } from 'src/common/types/apiTypes'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Credencial, {
  CredencialType,
  isCredencial,
} from 'src/modules/mongodb/schema/credencialModel'
import Empresa, {
  EmpresaTypePrimitive,
} from 'src/modules/mongodb/schema/empresaModel'
import { comparar, encriptar } from '../criptografia/handleCrypt'

export interface createEmpresaDAO {
  credenciales: CredencialType
  empresa: EmpresaTypePrimitive
}

export interface updateEmpresaDAO {
  id: Schema.Types.ObjectId
  empresa: EmpresaTypePrimitive
}

export type readEmpresaDAO = Schema.Types.ObjectId | CredencialType | undefined

export interface deleteEmpresaDAO {
  id: Schema.Types.ObjectId
}

dbConnect()

export default class EmpresaDAO implements DAO {
  async create(
    datos: createEmpresaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const encriptado = await encriptar(datos.credenciales.contrasenia!)
      const nuevaCredencial = new Credencial({
        ...datos.credenciales,
        contrasenia: encriptado,
      })
      const credencialGuardada = await nuevaCredencial.save({ session })
      const newEmpresa = new Empresa({
        ...datos.empresa,
        credenciales: credencialGuardada._id,
      })
      const guardado = await newEmpresa.save({ session })
      await session.commitTransaction()
      await session.endSession()
      return { status: 201, data: guardado }
    } catch (error) {
      const msg = (error as Error).message
      await session.abortTransaction()
      await session.endSession()
      return { status: 500, msg }
    }
  }
  async read(datos: readEmpresaDAO): Promise<CompleteRequest | ErrorRequest> {
    try {
      let empresa = null
      switch (typeof datos) {
        case 'string':
          empresa = await Empresa.findOne({ _id: datos })
          break
        case 'object':
          if (isCredencial(datos)) {
            const credencial = await Credencial.findOne({
              correo: datos.correo,
            })
            if (await comparar(datos.contrasenia!, credencial.contrasenia)) {
              empresa = await Empresa.findOne({ credenciales: credencial._id })
            }
          }
          break
        case 'undefined':
        default:
          empresa = await Empresa.find()
          break
      }
      if (!empresa)
        return { status: 404, msg: 'No se encontro a un usuario registrado' }
      return { status: 201, data: empresa }
    } catch (error) {
      const msg = (error as Error).message
      return { status: 400, msg }
    }
  }
  async update(
    datos: updateEmpresaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const actualizado = await Empresa.findByIdAndUpdate(
        datos.id,
        datos.empresa,
        {
          new: true,
          session,
        },
      )
      if (!actualizado) {
        await session.abortTransaction()
        await session.endSession()
        return { status: 404, msg: 'No se encontro al usuario' }
      }
      await session.commitTransaction()
      await session.endSession()
      return { status: 200, data: actualizado }
    } catch (error) {
      const msg = (error as Error).message
      await session.abortTransaction()
      await session.endSession()
      return { status: 400, msg }
    }
  }
  async delete(
    datos: deleteEmpresaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const eliminado = await Empresa.findByIdAndDelete(datos.id, { session })
      if (!eliminado) {
        await session.abortTransaction()
        await session.endSession()
        return { status: 404, msg: 'No se encontro al usuario' }
      }
      await session.commitTransaction()
      await session.endSession()
      return { status: 204, data: eliminado }
    } catch (error) {
      const msg = (error as Error).message
      await session.abortTransaction()
      await session.endSession()
      return { status: 400, msg }
    }
  }
}

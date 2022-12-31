import mongoose, { Schema } from 'mongoose'
import { CompleteRequest, DAO, ErrorRequest } from 'src/common/types/apiTypes'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Credencial, {
  CredencialType,
} from 'src/modules/mongodb/schema/credencialModel'
import { encriptar } from '../criptografia/handleCrypt'

export interface createCredencialDAO {
  credenciales: CredencialType
}

export interface updateCredencialDAO {
  id: Schema.Types.ObjectId
  credenciales: CredencialType
}
//FALTA ACTUALIZAR
export interface readCredencialDAO {
  id?: Schema.Types.ObjectId
}

export interface deleteCredencialDAO {
  id: Schema.Types.ObjectId
}

dbConnect()

export default class CredencialDAO implements DAO {
  async create(
    datos: createCredencialDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    try {
      const nuevaCredencial = new Credencial({
        ...datos.credenciales,
        contrasenia: encriptar(datos.credenciales.contrasenia!),
      })
      const credencialGuardada = await nuevaCredencial.save()
      return { status: 201, data: credencialGuardada }
    } catch (error) {
      const msg = (error as Error).message
      return { status: 500, msg }
    }
  }
  async read(
    datos: readCredencialDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    try {
      let persona = null
      if (typeof datos !== 'undefined') {
        if (typeof datos.id === 'string') {
          persona = await Credencial.findOne({ _id: datos.id })
        }
      } else {
        persona = await Credencial.find()
      }
      if (!persona)
        return { status: 404, msg: 'No se encontro al usuario registrado' }
      return { status: 201, data: persona }
    } catch (error) {
      const msg = (error as Error).message
      return { status: 400, msg }
    }
  }
  async update(
    datos: updateCredencialDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const actualizado = await Credencial.findByIdAndUpdate(
        datos.id,
        datos.credenciales,
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
    datos: deleteCredencialDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const eliminado = await Credencial.findByIdAndDelete(datos.id, {
        session,
      })
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

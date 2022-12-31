import mongoose, { Schema } from 'mongoose'
import { CompleteRequest, DAO, ErrorRequest } from 'src/common/types/apiTypes'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Oferta, {
  OfertaTypePrimitive,
} from 'src/modules/mongodb/schema/ofertaModel'

export interface createOfertaDAO {
  oferta: OfertaTypePrimitive
}

export interface updateOfertaDAO {
  id: Schema.Types.ObjectId
  oferta: OfertaTypePrimitive
}

export type readOfertaDAO = Schema.Types.ObjectId | undefined

export interface deleteOfertaDAO {
  id: Schema.Types.ObjectId
}

dbConnect()

export default class OfertaDAO implements DAO {
  async create(
    datos: createOfertaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const nuevaOferta = new Oferta({ ...datos.oferta, postulantes: [] })
      const guardado = await nuevaOferta.save({ session })
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
  async read(datos: readOfertaDAO): Promise<CompleteRequest | ErrorRequest> {
    try {
      let persona = null
      if (typeof datos !== 'undefined') {
        persona = await Oferta.findOne({ _id: datos })
      } else {
        persona = await Oferta.find()
      }
      if (!persona) return { status: 404, msg: 'No se encontraron datos' }
      return { status: 201, data: persona }
    } catch (error) {
      const msg = (error as Error).message
      return { status: 400, msg }
    }
  }
  async update(
    datos: updateOfertaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const actualizado = await Oferta.findByIdAndUpdate(
        datos.id,
        datos.oferta,
        {
          new: true,
          session,
        },
      )
      if (!actualizado) {
        await session.abortTransaction()
        await session.endSession()
        return { status: 404, msg: 'No se encontro la oferta de trabajo' }
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
    datos: deleteOfertaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const eliminado = await Oferta.findByIdAndDelete(datos.id, { session })
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

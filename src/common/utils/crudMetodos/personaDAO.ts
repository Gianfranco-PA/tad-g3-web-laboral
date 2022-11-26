import mongoose, { Schema } from 'mongoose'
import { CompleteRequest, DAO, ErrorRequest } from 'src/common/types/apiTypes'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Credencial, {
  CredencialType,
} from 'src/modules/mongodb/schema/credencialModel'
import Empresa from 'src/modules/mongodb/schema/empresaModel'
import Persona, { PersonaType } from 'src/modules/mongodb/schema/personaModel'

export interface createPersonaDAO {
  credenciales: CredencialType
  persona: PersonaType
}

export interface updatePersonaDAO {
  id: Schema.Types.ObjectId
  persona: PersonaType
}

export type readPersonaDAO = Schema.Types.ObjectId | CredencialType | undefined

export interface deletePersonaDAO {
  id: Schema.Types.ObjectId
}

dbConnect()

export default class PersonaDAO implements DAO {
  async create(
    datos: createPersonaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const nuevaCredencial = new Credencial(datos.credenciales)
      const credencialGuardada = await nuevaCredencial.save({ session })
      const newPersona = new Persona({
        ...datos.persona,
        credenciales: credencialGuardada._id,
      })
      const guardado = await newPersona.save({ session })
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
  async read(datos: readPersonaDAO): Promise<CompleteRequest | ErrorRequest> {
    try {
      let persona = null
      switch (typeof datos) {
        case 'string':
          persona = await Persona.findOne({ _id: datos })
          break
        case 'object':
          const credencial = await Credencial.findOne({ ...datos })
          persona = await Persona.findOne({ credenciales: credencial._id })
          break
        case 'undefined':
        default:
          persona = await Persona.find()
          break
      }
      if (!persona) return { status: 404, msg: 'No se encontraron datos' }
      return { status: 201, data: persona }
    } catch (error) {
      const msg = (error as Error).message
      return { status: 400, msg }
    }
  }
  async update(
    datos: updatePersonaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const actualizado = await Persona.findByIdAndUpdate(
        datos.id,
        datos.persona,
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
  //mejorar a creden
  async delete(
    datos: deletePersonaDAO,
  ): Promise<CompleteRequest | ErrorRequest> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const eliminado = await Persona.findByIdAndDelete(datos.id, { session })
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

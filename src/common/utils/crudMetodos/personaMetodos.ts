import mongoose from 'mongoose'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Persona, { PersonaType } from 'src/modules/mongodb/schema/personaModel'
import Credencial, {
  CredencialType,
} from 'src/modules/mongodb/schema/credencialModel'
import { CompleteRequest, ErrorRequest } from 'src/common/types/apiTypes'

dbConnect()

export async function identificarPersona(
  datos: CredencialType,
): Promise<CompleteRequest | ErrorRequest> {
  try {
    const credencial = await Credencial.findOne({ ...datos })
    if (!credencial)
      return { status: 404, msg: 'No se encontro a un usuario registrado' }
    const persona = await Persona.findOne({ credenciales: credencial._id })
    if (!persona)
      return { status: 404, msg: 'No se encontro a un usuario registrado' }
    return { status: 201, data: persona }
  } catch (error) {
    const msg = (error as Error).message
    return { status: 400, msg }
  }
}

export async function personaPorId(
  id: string,
): Promise<CompleteRequest | ErrorRequest> {
  try {
    const persona = await Persona.findOne({ _id: id })
    if (!persona)
      return { status: 404, msg: 'No se encontro a un usuario registrado' }
    return { status: 201, data: persona }
  } catch (error) {
    const msg = (error as Error).message
    return { status: 400, msg }
  }
}

export async function registrarPersona(
  datos: CredencialType,
  persona: PersonaType,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const nuevaCredencial = new Credencial(datos)
    const credencialGuardada = await nuevaCredencial.save()
    const newPersona = new Persona({
      ...persona,
      credenciales: credencialGuardada._id,
    })
    const guardado = await newPersona.save({ session })
    await session.commitTransaction()
    return { status: 201, data: guardado }
  } catch (error) {
    const msg = (error as Error).message
    await session.abortTransaction()
    return { status: 500, msg }
  }
}

export async function actualizarPersona(
  id: string,
  persona: PersonaType,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const actualizado = await Persona.findByIdAndUpdate(id, persona, {
      new: true,
      session,
    })
    if (!actualizado) {
      await session.abortTransaction()
      return { status: 404, msg: 'No se encontro al Usuario' }
    }
    await session.commitTransaction()
    return { status: 200, data: actualizado }
  } catch (error) {
    const msg = (error as Error).message
    await session.abortTransaction()
    return { status: 400, msg }
  }
}

export async function eliminarPersona(
  id: string,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const eliminado = await Persona.findByIdAndDelete(id, { session })
    if (!eliminado) {
      await session.abortTransaction()
      return { status: 404, msg: 'No se encontro el Dato' }
    }
    await session.commitTransaction()
    return { status: 204, data: eliminado }
  } catch (error) {
    const msg = (error as Error).message
    await session.abortTransaction()
    return { status: 400, msg }
  }
}

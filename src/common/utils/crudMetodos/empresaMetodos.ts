import mongoose from 'mongoose'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Empresa, { EmpresaType } from 'src/modules/mongodb/schema/empresaModel'
import Credencial, {
  CredencialType,
} from 'src/modules/mongodb/schema/credencialModel'
import { CompleteRequest, ErrorRequest } from 'src/common/types/apiTypes'

dbConnect()

export async function identificarEmpresa(
  datos: CredencialType,
): Promise<CompleteRequest | ErrorRequest> {
  try {
    const credencial = await Credencial.findOne({ ...datos })
    if (!credencial)
      return { status: 404, msg: 'No se encontro a un usuario registrado' }
    const persona = await Empresa.findOne({ credenciales: credencial._id })
    if (!persona)
      return { status: 404, msg: 'No se encontro a un usuario registrado' }
    return { status: 201, data: persona }
  } catch (error) {
    const msg = (error as Error).message
    return { status: 400, msg }
  }
}

export async function empresaPorId(
  id: string,
): Promise<CompleteRequest | ErrorRequest> {
  try {
    const persona = await Empresa.findOne({ _id: id })
    if (!persona)
      return { status: 404, msg: 'No se encontro a un usuario registrado' }
    return { status: 201, data: persona }
  } catch (error) {
    const msg = (error as Error).message
    return { status: 400, msg }
  }
}

export async function registrarEmpresa(
  datos: CredencialType,
  persona: EmpresaType,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const nuevaCredencial = new Credencial(datos)
    const credencialGuardada = await nuevaCredencial.save()
    const newPersona = new Empresa({
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

export async function actualizarEmpresa(
  id: string,
  persona: EmpresaType,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const actualizado = await Empresa.findByIdAndUpdate(id, persona, {
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

export async function eliminarEmpresa(
  id: string,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const eliminado = await Empresa.findByIdAndDelete(id, { session })
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

import mongoose from 'mongoose'
import { dbConnect } from 'src/modules/mongodb/inicializacion'
import Oferta, { OfertaType } from 'src/modules/mongodb/schema/ofertaModel'
import { CompleteRequest, ErrorRequest } from 'src/common/types/apiTypes'

dbConnect()

export async function obtenerOfertas(): Promise<
  CompleteRequest | ErrorRequest
> {
  try {
    const persona = await Oferta.find()
    return { status: 201, data: persona }
  } catch (error) {
    const msg = (error as Error).message
    return { status: 400, msg }
  }
}

export async function ofertaPorId(
  id: string,
): Promise<CompleteRequest | ErrorRequest> {
  try {
    const persona = await Oferta.findOne({ _id: id })
    return { status: 201, data: persona }
  } catch (error) {
    const msg = (error as Error).message
    return { status: 400, msg }
  }
}

export async function registrarOferta(
  oferta: OfertaType,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const nuevaOferta = new Oferta(oferta)
    const guardado = await nuevaOferta.save({ session })

    await session.commitTransaction()
    return { status: 201, data: guardado }
  } catch (error) {
    const msg = (error as Error).message

    await session.abortTransaction()
    return { status: 500, msg }
  }
}

export async function actualizarOferta(
  id: string,
  oferta: OfertaType,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const actualizado = await Oferta.findByIdAndUpdate(id, oferta, {
      new: true,
      session,
    })
    if (!actualizado) {
      await session.abortTransaction()
      return { status: 404, msg: 'No se encontro la Oferta' }
    }
    await session.commitTransaction()
    return { status: 200, data: actualizado }
  } catch (error) {
    const msg = (error as Error).message
    await session.abortTransaction()
    return { status: 400, msg }
  }
}

export async function eliminarOferta(
  id: string,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const eliminado = await Oferta.findByIdAndDelete(id, { session })
    if (!eliminado) {
      await session.abortTransaction()
      return { status: 404, msg: 'No se encontro la Oferta' }
    }
    await session.commitTransaction()
    return { status: 204, data: eliminado }
  } catch (error) {
    const msg = (error as Error).message
    await session.abortTransaction()
    return { status: 400, msg }
  }
}

import bcrypt from 'bcryptjs'
export const encriptar = async (textPlano: string) => {
  const hash = await bcrypt.hash(textPlano, 10)
  return hash
}
export const comparar = async (textPlano: string, hash: string) => {
  return await bcrypt.compare(textPlano, hash)
}

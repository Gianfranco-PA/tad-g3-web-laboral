import { createContext, useContext } from 'react'
import { EmpresaTypeData } from 'src/modules/mongodb/schema/empresaModel'
import { PersonaTypeData } from 'src/modules/mongodb/schema/personaModel'

export interface loginContext {
  user: object | null
  onChangeUser: ((e: any) => void) | null
}

export const LoginContext = createContext<loginContext>({
  user: null,
  onChangeUser: null,
})

export const useLoginContext = () => {
  const ctx = useContext(LoginContext)
  if (!ctx) {
    throw new Error('useSpicyState must be used within the SpicyProvider')
  }

  return ctx
}

export const initialUser = () => {
  let initial: PersonaTypeData | EmpresaTypeData | null = null
  const guardado = localStorage.getItem('user')
  if (guardado) {
    initial = JSON.parse(guardado)
  }
  return initial
}

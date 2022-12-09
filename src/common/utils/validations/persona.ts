import { PersonaTypeData, PersonaTypePrimitive } from "src/modules/mongodb/schema/personaModel"

export function isPersonaPrimitive(arg: any): arg is PersonaTypePrimitive {
    return (
      arg &&
      arg.nombre &&
      arg.apellido &&
      arg.celular &&
      arg.dni &&
      arg.sexo &&
      arg.fNacimiento &&
      arg.direccion &&
      arg.ciudad &&
      arg.credenciales &&
      typeof arg.nombre == 'string' &&
      typeof arg.apellido == 'string' &&
      typeof arg.celular == 'string' &&
      typeof arg.dni == 'string' &&
      typeof arg.sexo == 'string' &&
      typeof arg.fNacimiento == 'string' &&
      typeof arg.direccion == 'string' &&
      typeof arg.ciudad == 'string' &&
      typeof arg.credenciales == 'string'
    )
  }
  
  export function isPersonaData(arg: any): arg is PersonaTypeData {
    return (
      arg &&
      arg.nombre &&
      arg.apellido &&
      arg.celular &&
      arg.dni &&
      arg.sexo &&
      arg.fNacimiento &&
      arg.direccion &&
      arg.ciudad &&
      arg.credenciales &&
      typeof arg.nombre == 'string' &&
      typeof arg.apellido == 'string' &&
      typeof arg.celular == 'string' &&
      typeof arg.dni == 'string' &&
      typeof arg.sexo == 'string' &&
      typeof arg.fNacimiento == 'string' &&
      typeof arg.direccion == 'string' &&
      typeof arg.ciudad == 'string' &&
      typeof arg.credenciales == 'object'
    )
  }
  
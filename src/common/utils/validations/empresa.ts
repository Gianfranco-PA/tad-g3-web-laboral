import { EmpresaTypeData, EmpresaTypePrimitive } from "src/modules/mongodb/schema/empresaModel"

export function isEmpresaPrimitive(arg: any): arg is EmpresaTypePrimitive {
    return (
      arg &&
      arg.nombre_empresa &&
      arg.ruc &&
      arg.direccion &&
      arg.ciudad &&
      arg.rubro &&
      arg.nombre_contacto &&
      arg.apellidos &&
      arg.celular &&
      arg.credenciales &&
      typeof arg.nombre_empresa == 'string' &&
      typeof arg.ruc == 'string' &&
      typeof arg.direccion == 'string' &&
      typeof arg.ciudad == 'string' &&
      typeof arg.rubro == 'string' &&
      typeof arg.nombre_contacto == 'string' &&
      typeof arg.apellidos == 'string' &&
      typeof arg.celular == 'string' &&
      typeof arg.credenciales == 'string'
    )
  }
  
  export function isEmpresaData(arg: any): arg is EmpresaTypeData {
    return (
      arg &&
      arg.nombre_empresa &&
      arg.ruc &&
      arg.direccion &&
      arg.ciudad &&
      arg.rubro &&
      arg.nombre_contacto &&
      arg.apellidos &&
      arg.celular &&
      arg.credenciales &&
      typeof arg.nombre_empresa == 'string' &&
      typeof arg.ruc == 'string' &&
      typeof arg.direccion == 'string' &&
      typeof arg.ciudad == 'string' &&
      typeof arg.rubro == 'string' &&
      typeof arg.nombre_contacto == 'string' &&
      typeof arg.apellidos == 'string' &&
      typeof arg.celular == 'string' &&
      typeof arg.credenciales == 'object'
    )
  }
  
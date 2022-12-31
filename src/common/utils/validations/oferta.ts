import {
  OfertaTypeData,
  OfertaTypePrimitive,
} from 'src/modules/mongodb/schema/ofertaModel'

export function isOfertaPrimitive(arg: any): arg is OfertaTypePrimitive {
  // console.log("----")
  // console.log(arg)
  // console.log(Boolean(arg))
  // console.log(Boolean(arg.titulo))
  // console.log(Boolean(arg.conocimientos))
  // console.log(Boolean(arg.estudios_minimos))
  // console.log(Boolean(arg.idioma))
  // console.log(Boolean(arg.lugar))
  // console.log(Boolean(arg.puesto))
  // console.log(Boolean(arg.area))
  // console.log(Boolean(arg.jornada_laboral))
  // console.log(Boolean(arg.fecha_publicacion))
  // console.log(Boolean(arg.postulantes))
  // console.log(Boolean(arg.empresa))
  // console.log("----")
  // console.log(Boolean(typeof arg.titulo == 'string'))
  // console.log(Boolean(typeof arg.conocimientos == 'string'))
  // console.log(Boolean(typeof arg.estudios_minimos == 'string'))
  // console.log(Boolean(typeof arg.idioma == 'string'))
  // console.log(Boolean(typeof arg.lugar == 'string'))
  // console.log(Boolean(typeof arg.puesto == 'string'))
  // console.log(Boolean(typeof arg.area == 'string'))
  // console.log(Boolean(typeof arg.jornada_laboral == 'string'))
  // console.log(Boolean(typeof arg.fecha_publicacion == 'string'))
  // console.log(Boolean(typeof arg.empresa == 'string'))
  return (
    arg &&
    arg.titulo &&
    arg.conocimientos &&
    arg.estudios_minimos &&
    arg.idioma &&
    arg.lugar &&
    arg.puesto &&
    arg.area &&
    arg.jornada_laboral &&
    arg.fecha_publicacion &&
    arg.postulantes &&
    arg.empresa &&
    typeof arg.titulo == 'string' &&
    typeof arg.conocimientos == 'string' &&
    typeof arg.estudios_minimos == 'string' &&
    typeof arg.idioma == 'string' &&
    typeof arg.lugar == 'string' &&
    typeof arg.puesto == 'string' &&
    typeof arg.area == 'string' &&
    typeof arg.jornada_laboral == 'string' &&
    typeof arg.fecha_publicacion == 'string' &&
    typeof arg.empresa == 'string'
  )
}

export function isOfertaData(arg: any): arg is OfertaTypeData {
  // console.log('----')
  // console.log(arg)
  // console.log(Boolean(arg))
  // console.log(Boolean(arg.titulo))
  // console.log(Boolean(arg.conocimientos))
  // console.log(Boolean(arg.estudios_minimos))
  // console.log(Boolean(arg.idioma))
  // console.log(Boolean(arg.lugar))
  // console.log(Boolean(arg.puesto))
  // console.log(Boolean(arg.area))
  // console.log(Boolean(arg.jornada_laboral))
  // console.log(Boolean(arg.fecha_publicacion))
  // console.log(Boolean(arg.postulantes))
  // console.log(Boolean(arg.empresa))
  // console.log('----')
  // console.log(Boolean(typeof arg.titulo == 'string'))
  // console.log(Boolean(typeof arg.conocimientos == 'string'))
  // console.log(Boolean(typeof arg.estudios_minimos == 'string'))
  // console.log(Boolean(typeof arg.idioma == 'string'))
  // console.log(Boolean(typeof arg.lugar == 'string'))
  // console.log(Boolean(typeof arg.puesto == 'string'))
  // console.log(Boolean(typeof arg.area == 'string'))
  // console.log(Boolean(typeof arg.jornada_laboral == 'string'))
  // console.log(Boolean(typeof arg.fecha_publicacion == 'string'))
  // console.log(Boolean(Array.isArray(arg.postulantes)))
  // console.log(Boolean(typeof arg.empresa == 'object'))
  return (
    arg &&
    arg.titulo &&
    arg.conocimientos &&
    arg.estudios_minimos &&
    arg.idioma &&
    arg.lugar &&
    arg.puesto &&
    arg.area &&
    arg.jornada_laboral &&
    arg.fecha_publicacion &&
    arg.postulantes &&
    arg.empresa &&
    typeof arg.titulo == 'string' &&
    typeof arg.conocimientos == 'string' &&
    typeof arg.estudios_minimos == 'string' &&
    typeof arg.idioma == 'string' &&
    typeof arg.lugar == 'string' &&
    typeof arg.puesto == 'string' &&
    typeof arg.area == 'string' &&
    typeof arg.jornada_laboral == 'string' &&
    typeof arg.fecha_publicacion == 'string' &&
    Array.isArray(arg.postulantes) &&
    typeof arg.empresa == 'object'
  )
}

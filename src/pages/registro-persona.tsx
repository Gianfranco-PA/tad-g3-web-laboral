import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import background from 'src/common/assets/images/Login_espacio.jpeg'
import { CampoInput } from 'src/common/components/campoInput'
import { CampoSelect } from 'src/common/components/campoSelect'
import { PersonaTypePrimitive } from 'src/modules/mongodb/schema/personaModel'
//Parameters:
interface Persona extends PersonaTypePrimitive {
  correo: string
  contrasenia: string
  conf_contrasenia: string
}

const INITIAL_STATE = {
  nombre: '',
  apellido: '',
  celular: '',
  dni: '',
  sexo: '',
  fNacimiento: '',
  direccion: '',
  ciudad: '',

  correo: '',
  contrasenia: '',
  conf_contrasenia: '',
}

export default function LoginPage({}) {
  const [persona, setPersona] = useState<Persona>(INITIAL_STATE)

  const [logueado, setLogueado] = useState(null)

  const router = useRouter()
  if (logueado) router.push('/login')

  const changeHandlerInput = (e: FormEvent<HTMLInputElement>) => {
    return setPersona({
      ...persona,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }
  const changeHandlerSelect = (e: FormEvent<HTMLSelectElement>) => {
    return setPersona({
      ...persona,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const reset = () => {
    setPersona(INITIAL_STATE)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (persona.contrasenia == persona.conf_contrasenia) {
      await fetch(`/api/persona`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          credenciales: {
            correo: persona.correo,
            contrasenia: persona.contrasenia,
          },
          persona: {
            ...persona,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (typeof data == 'object') setLogueado(data)
        })
      reset()
    } else {
      console.log('Contraseñas diferentes')
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="w-50 h-50 my-5 d-flex flex-column justify-content-center align-items-center rounded-5"
        style={{ backgroundColor: 'white' }}
      >
        <form
          className="w-100 py-5 d-flex flex-column justify-content-center align-items-center"
          onSubmit={onSubmit}
        >
          <h1 className="fs-title">Registro Persona</h1>
          <h3 className="fs-subtitle">Ingrese sus datos</h3>

          <CampoInput
            id="nombre"
            name="nombre"
            label="Nombre:"
            value={persona.nombre!}
            onChange={changeHandlerInput}
            type="text"
          />
          <CampoInput
            id="apellido"
            name="apellido"
            label="Apellido:"
            value={persona.apellido!}
            onChange={changeHandlerInput}
            type="text"
          />

          <CampoInput
            id="dni"
            name="dni"
            label="DNI:"
            value={persona.dni!}
            onChange={changeHandlerInput}
            type="text"
          />

          <CampoInput
            id="celular"
            name="celular"
            label="N° de Celular:"
            value={persona.celular!}
            onChange={changeHandlerInput}
            type="text"
          />

          <CampoSelect
            id="sexo"
            name="sexo"
            label="Sexo:"
            value={persona.sexo!}
            onChange={changeHandlerSelect}
            data={[
              { value: 'Hombre', label: 'Hombre' },
              { value: 'Mujer', label: 'Mujer' },
            ]}
          />

          <CampoInput
            id="fNacimiento"
            name="fNacimiento"
            label="Fecha de nacimiento:"
            value={persona.fNacimiento!}
            onChange={changeHandlerInput}
            type="date"
          />

          <CampoInput
            id="direccion"
            name="direccion"
            label="Dirección:"
            value={persona.direccion!}
            onChange={changeHandlerInput}
            type="text"
          />

          <CampoInput
            id="ciudad"
            name="ciudad"
            label="Ciudad:"
            value={persona.ciudad!}
            onChange={changeHandlerInput}
            type="text"
          />
          <h1 className="fs-title">Para el acceso</h1>
          <h3 className="fs-subtitle">Ingrese sus credenciales</h3>

          <CampoInput
            id="correo"
            name="correo"
            label="Email:"
            value={persona.correo}
            onChange={changeHandlerInput}
            type="text"
          />

          <CampoInput
            id="contrasenia"
            name="contrasenia"
            label="Contraseña:"
            value={persona.contrasenia}
            onChange={changeHandlerInput}
            type="password"
          />

          <CampoInput
            id="conf_contrasenia"
            name="conf_contrasenia"
            label="Confirmar contraseña:"
            value={persona.conf_contrasenia}
            onChange={changeHandlerInput}
            type="password"
          />
          <button type="submit" className="btn btn-primary mt-3 fs-5">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}

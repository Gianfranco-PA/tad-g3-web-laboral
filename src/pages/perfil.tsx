import { FormEvent, MouseEvent, useState } from 'react'
import { CampoInput } from 'src/common/components/campoInput'
import { CampoSelect } from 'src/common/components/campoSelect'
import { isEmpresaData } from 'src/common/utils/validations/empresa'
import { isPersonaData } from 'src/common/utils/validations/persona'
import { loginContext, useLoginContext } from 'src/hook/useLogin'
import { EmpresaTypeData } from 'src/modules/mongodb/schema/empresaModel'
import { PersonaTypeData } from 'src/modules/mongodb/schema/personaModel'

export default function PerfilPage() {
  const userData = useLoginContext()
  const [user, setUser] = useState(userData.user)
  const changeHandlerInput = (e: FormEvent<HTMLInputElement>) => {
    return setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }
  const changeHandlerSelect = (e: FormEvent<HTMLSelectElement>) => {
    return setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="w-75 h-50 my-5 d-flex flex-column justify-content-center align-items-center rounded-5"
        style={{ backgroundColor: 'white' }}
      >
        {isPersonaData(user) ? (
          <Persona
            data={user}
            onChangeInput={changeHandlerInput}
            onChangeSelect={changeHandlerSelect}
            context={userData}
          />
        ) : isEmpresaData(user) ? (
          <Empresa
            data={user}
            onChangeInput={changeHandlerInput}
            context={userData}
          />
        ) : null}
      </div>
    </div>
  )
}

interface PerfilPersona {
  data: PersonaTypeData
  onChangeInput: (e: FormEvent<HTMLInputElement>) => void
  onChangeSelect: (e: FormEvent<HTMLSelectElement>) => void
  context: loginContext
}

const Persona = ({
  data,
  onChangeInput,
  onChangeSelect,
  context,
}: PerfilPersona) => {
  const [edicion, setEdicion] = useState(true)
  const changeEdicion = (e: MouseEvent<HTMLButtonElement>) => {
    setEdicion(!edicion)
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (JSON.stringify(context.user) !== JSON.stringify(data)) {
      await fetch(`/api/persona/${data._id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ ...data }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isPersonaData(data)) {
            context.onChangeUser!(data)
          } else {
            // console.log(data)
          }
        })
    }
  }
  return (
    <form
      className="w-100 pb-5 d-flex flex-column justify-content-center align-items-center"
      onSubmit={onSubmit}
    >
      <h1 className="fs-title">Perfil</h1>
      <div className="row w-75">
        <div className="w-100 d-flex flex-row-reverse">
          <button
            type="submit"
            className="btn btn-primary mt-3 fs-5"
            onClick={changeEdicion}
          >
            Editar
          </button>
        </div>
      </div>
      <CampoInput
        id="nombre"
        name="nombre"
        label="Nombre:"
        value={data.nombre!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />
      <CampoInput
        id="apellido"
        name="apellido"
        label="Apellido:"
        value={data.apellido!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="dni"
        name="dni"
        label="DNI:"
        value={data.dni!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="celular"
        name="celular"
        label="N° de Celular:"
        value={data.celular!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoSelect
        id="sexo"
        name="sexo"
        label="Sexo:"
        value={data.sexo!}
        onChange={onChangeSelect}
        data={[
          { value: 'Hombre', label: 'Hombre' },
          { value: 'Mujer', label: 'Mujer' },
        ]}
        disabled={edicion}
      />

      <CampoInput
        id="fNacimiento"
        name="fNacimiento"
        label="Fecha de nacimiento:"
        value={data.fNacimiento!}
        onChange={onChangeInput}
        type="date"
        disabled={edicion}
      />

      <CampoInput
        id="direccion"
        name="direccion"
        label="Dirección:"
        value={data.direccion!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="ciudad"
        name="ciudad"
        label="Ciudad:"
        value={data.ciudad!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="correo"
        name="correo"
        label="Email:"
        value={data.credenciales!.correo!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="contrasenia"
        name="contrasenia"
        label="Contraseña:"
        value={data.credenciales!.contrasenia!}
        onChange={onChangeInput}
        type="password"
        disabled={edicion}
      />
    </form>
  )
}

interface PerfilEmpresa {
  data: EmpresaTypeData
  onChangeInput: (e: FormEvent<HTMLInputElement>) => void
  context: loginContext
}

const Empresa = ({ data, onChangeInput, context }: PerfilEmpresa) => {
  const [edicion, setEdicion] = useState(true)
  const changeEdicion = (e: MouseEvent<HTMLButtonElement>) => {
    setEdicion(!edicion)
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (JSON.stringify(context.user) !== JSON.stringify(data)) {
      await fetch(`/api/empresa/${data._id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ ...data }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isPersonaData(data)) {
            context.onChangeUser!(data)
          } else {
            // console.log(data)
          }
        })
    }
  }
  return (
    <form
      className="w-100 py-5 d-flex flex-column justify-content-center align-items-center"
      onSubmit={onSubmit}
    >
      <h1 className="fs-title">Perfil</h1>
      <button
        type="submit"
        className="btn btn-primary mt-3 fs-5"
        onClick={changeEdicion}
      >
        Editar
      </button>
      <CampoInput
        id="nombre_empresa"
        name="nombre_empresa"
        label="Nombre de la empresa:"
        value={data.nombre_empresa!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />
      <CampoInput
        id="ruc"
        name="ruc"
        label="RUC:"
        value={data.ruc!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />
      <CampoInput
        id="direccion"
        name="direccion"
        label="Direccion:"
        value={data.direccion!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="ciudad"
        name="ciudad"
        label="Ciudad:"
        value={data.ciudad!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="rubro"
        name="rubro"
        label="Rubro:"
        value={data.rubro!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <h5 className="fs-title">Sobre el Contacto</h5>

      <CampoInput
        id="nombre_contacto"
        name="nombre_contacto"
        label="Nombre:"
        value={data.nombre_contacto!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="apellidos"
        name="apellidos"
        label="Apellidos:"
        value={data.apellidos!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="celular"
        name="celular"
        label="Nro Celular:"
        value={data.celular!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="correo"
        name="correo"
        label="Email:"
        value={data.credenciales!.correo!}
        onChange={onChangeInput}
        type="text"
        disabled={edicion}
      />

      <CampoInput
        id="contrasenia"
        name="contrasenia"
        label="Contraseña:"
        value={data.credenciales!.contrasenia!}
        onChange={onChangeInput}
        type="password"
        disabled={edicion}
      />
    </form>
  )
}

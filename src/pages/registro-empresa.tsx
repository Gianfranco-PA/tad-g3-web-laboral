import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import background from 'src/common/assets/images/Login_espacio.jpeg'
import { CampoInput } from 'src/common/components/campoInput'
import { EmpresaTypePrimitive } from 'src/modules/mongodb/schema/empresaModel'
//Parameters:
interface Empresa extends EmpresaTypePrimitive {
  correo: string
  contrasenia: string
  conf_contrasenia: string
}

const INITIAL_STATE = {
  nombre_empresa: '',
  ruc: '',
  direccion: '',
  ciudad: '',
  rubro: '',

  nombre_contacto: '',
  apellidos: '',
  celular: '',

  correo: '',
  contrasenia: '',
  conf_contrasenia: '',
}

export default function LoginPage({}) {
  const [empresa, setEmpresa] = useState<Empresa>(INITIAL_STATE)

  const [logueado, setLogueado] = useState(null)

  const router = useRouter()
  if (logueado) router.push('/login')

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    return setEmpresa({
      ...empresa,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const reset = () => {
    setEmpresa(INITIAL_STATE)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch(`/api/empresa`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        credenciales: {
          correo: empresa.correo,
          contrasenia: empresa.contrasenia,
        },
        empresa: {
          ...empresa,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data == 'object') setLogueado(data)
      })
    reset()
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
          <h1 className="fs-title">Sobre la Empresa</h1>
          <h3 className="fs-subtitle">Ingrese datos de la Empresa</h3>

          <CampoInput
            id="nombre_empresa"
            name="nombre_empresa"
            label="Nombre de la empresa:"
            value={empresa.nombre_empresa!}
            onChange={changeHandler}
            type="text"
          />
          <CampoInput
            id="ruc"
            name="ruc"
            label="RUC:"
            value={empresa.ruc!}
            onChange={changeHandler}
            type="text"
          />
          <CampoInput
            id="direccion"
            name="direccion"
            label="Direccion:"
            value={empresa.direccion!}
            onChange={changeHandler}
            type="text"
          />

          <CampoInput
            id="ciudad"
            name="ciudad"
            label="Ciudad:"
            value={empresa.ciudad!}
            onChange={changeHandler}
            type="text"
          />

          <CampoInput
            id="rubro"
            name="rubro"
            label="Rubro:"
            value={empresa.rubro!}
            onChange={changeHandler}
            type="text"
          />

          <h1 className="fs-title">Sobre el Contacto</h1>
          <h3 className="fs-subtitle">Ingrese datos del Contacto</h3>

          <CampoInput
            id="nombre_contacto"
            name="nombre_contacto"
            label="Nombre:"
            value={empresa.nombre_contacto!}
            onChange={changeHandler}
            type="text"
          />

          <CampoInput
            id="apellidos"
            name="apellidos"
            label="Apellidos:"
            value={empresa.apellidos!}
            onChange={changeHandler}
            type="text"
          />

          <CampoInput
            id="celular"
            name="celular"
            label="Nro Celular:"
            value={empresa.celular!}
            onChange={changeHandler}
            type="text"
          />

          <h1 className="fs-title">Para el acceso</h1>
          <h3 className="fs-subtitle">Ingrese sus credenciales</h3>

          <CampoInput
            id="correo"
            name="correo"
            label="Email:"
            value={empresa.correo}
            onChange={changeHandler}
            type="text"
          />

          <CampoInput
            id="contrasenia"
            name="contrasenia"
            label="Contraseña:"
            value={empresa.contrasenia}
            onChange={changeHandler}
            type="password"
          />

          <CampoInput
            id="conf_contrasenia"
            name="conf_contrasenia"
            label="Confirmar contraseña:"
            value={empresa.conf_contrasenia}
            onChange={changeHandler}
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

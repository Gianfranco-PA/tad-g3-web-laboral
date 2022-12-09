import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import background from 'src/common/assets/images/Login_espacio.jpeg'
import { CampoInput } from 'src/common/components/campoInput'
import { useLoginContext } from 'src/hook/useLogin'
import { CredencialType } from 'src/modules/mongodb/schema/credencialModel'

export default function LoginPage({}) {
  const [usuario, setUsuario] = useState<CredencialType>({
    correo: '',
    contrasenia: '',
  })

  const logueado = useLoginContext()

  const router = useRouter()

  if (logueado.user) router.push('/')

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    return setUsuario({
      ...usuario,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch(`/api/autenticacion`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ ...usuario }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data == 'object') {
          logueado.onChangeUser!(data)
          // router.push('/')
        }
      })
  }

  return (
    <div
      className="vw-100 vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="w-50 h-50 d-flex flex-column justify-content-center align-items-center rounded-5"
        style={{ backgroundColor: 'white' }}
      >
        <form
          className="w-100 d-flex flex-column justify-content-center align-items-center"
          onSubmit={onSubmit}
        >
          <CampoInput
            id="correo"
            name="correo"
            label="Correo:"
            value={usuario.correo!}
            onChange={changeHandler}
            type="text"
          />
          <CampoInput
            id="contrasenia"
            name="contrasenia"
            label="Contraseña:"
            value={usuario.contrasenia!}
            onChange={changeHandler}
            type="password"
          />
          <button type="submit" className="btn btn-primary mt-3 fs-5">
            Iniciar sesión
          </button>
        </form>
        <div style={{ display: 'flex' }}>
          <p>Registrarse como&nbsp;</p>
          <Link href="/registro-persona">
            <a className="text-decoration-none">persona</a>
          </Link>
          <p>&nbsp;o&nbsp;</p>
          <Link href="/registro-empresa">
            <a className="text-decoration-none">empresa</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

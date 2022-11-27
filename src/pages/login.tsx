import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import background from 'src/common/assets/images/Login_espacio.jpeg'
import { Campo } from 'src/common/components/campoInput'
import server from 'src/common/utils/constans/urlEnvironment'
import { CredencialType } from 'src/modules/mongodb/schema/credencialModel'

export default function LoginPage({}) {
  const [usuario, setUsuario] = useState<CredencialType>({
    correo: '',
    contrasenia: '',
  })

  const [logueado, setLogueado] = useState(null)

  const router = useRouter()
  if (logueado) router.push('/')

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    return setUsuario({
      ...usuario,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('dominio es: ' + server)
    await fetch(`${server}/api/autenticacion`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ credenciales: usuario }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data == 'object') setLogueado(data)
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
          <Campo
            id="correo"
            name="correo"
            label="Correo:"
            value={usuario.correo!}
            onChange={changeHandler}
            type="text"
          />
          <Campo
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
        <Link href="/company-registration">
          <a className="text-decoration-none mt-3">¿No estas registrado?</a>
        </Link>
      </div>
    </div>
  )
}

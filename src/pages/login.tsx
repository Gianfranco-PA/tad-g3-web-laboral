import Link from 'next/link'
import { FormEvent, useState } from 'react'
import background from 'src/common/assets/images/Login_espacio.jpeg'
import { Campo } from 'src/common/components/campoInput'

interface Usuario {
  correo: string
  contrasenia: string
}

export default function LoginPage({}) {
  const [usuario, setUsuario] = useState<Usuario>({
    correo: '',
    contrasenia: '',
  })

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    return setUsuario({
      ...usuario,
      [e.currentTarget.name]: e.currentTarget.value,
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
        <form className="w-100 d-flex flex-column justify-content-center align-items-center">
          <Campo
            id="correo"
            name="correo"
            label="Correo:"
            value={usuario.correo}
            onChange={changeHandler}
            type="text"
          />
          <Campo
            id="contrasenia"
            name="contrasenia"
            label="Contraseña:"
            value={usuario.contrasenia}
            onChange={changeHandler}
            type="password"
          />
          <input
            name="login"
            id="login"
            className="btn btn-primary mt-3 fs-5"
            type="button"
            value="Iniciar sesión"
          />
        </form>
        <Link href="">
          <a className="text-decoration-none mt-3">¿No estas registrado?</a>
        </Link>
      </div>
    </div>
  )
}

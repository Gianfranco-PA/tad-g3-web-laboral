import { FormEvent, useState } from 'react'
import background from 'src/common/assets/images/Login_espacio.jpeg'
import { Campo } from 'src/common/components/campoInput'

//Parameters:
interface Usuario {
  //section 1:
  business_name: string
  business_ruc: string
  address: string
  city: string
  business: string
  business_field: string

  //section 2:
  fname: string
  lname: string
  phone: string

  //section 3:
  email: string
  pass: string
  cpass: string
}

export default function LoginPage({}) {
  const [usuario, setUsuario] = useState<Usuario>({
    business_name: '',
    business_ruc: '',
    address: '',
    city: '',
    business: '',
    business_field: '',

    fname: '',
    lname: '',
    phone: '',

    email: '',
    pass: '',
    cpass: '',
  })

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    return setUsuario({
      ...usuario,
      [e.currentTarget.name]: e.currentTarget.value,
    })
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
        <form className="w-100 py-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="fs-title">Sobre la Empresa</h1>
          <h3 className="fs-subtitle">Ingrese datos de la Empresa</h3>

          <Campo
            id="business_name"
            name="business_name"
            label="Nombre de la empresa:"
            value={usuario.business_name}
            onChange={changeHandler}
            type="text"
          />
          <Campo
            id="business_ruc"
            name="business_ruc"
            label="RUC:"
            value={usuario.business_ruc}
            onChange={changeHandler}
            type="text"
          />
          <Campo
            id="address"
            name="address"
            label="Direccion:"
            value={usuario.address}
            onChange={changeHandler}
            type="text"
          />

          <Campo
            id="city"
            name="city"
            label="Ciudad:"
            value={usuario.city}
            onChange={changeHandler}
            type="text"
          />

          <Campo
            id="business_field"
            name="business_field"
            label="Rubro:"
            value={usuario.business_field}
            onChange={changeHandler}
            type="text"
          />

          <h1 className="fs-title">Sobre el Contacto</h1>
          <h3 className="fs-subtitle">Ingrese datos del Contacto</h3>

          <Campo
            id="fname"
            name="fname"
            label="Nombre:"
            value={usuario.fname}
            onChange={changeHandler}
            type="text"
          />

          <Campo
            id="lname"
            name="lname"
            label="Apellidos:"
            value={usuario.lname}
            onChange={changeHandler}
            type="text"
          />

          <Campo
            id="phone"
            name="phone"
            label="Nro Celular:"
            value={usuario.phone}
            onChange={changeHandler}
            type="text"
          />

          <h1 className="fs-title">Para el acceso</h1>
          <h3 className="fs-subtitle">Ingrese sus credenciales</h3>

          <Campo
            id="email"
            name="email"
            label="Email:"
            value={usuario.email}
            onChange={changeHandler}
            type="text"
          />

          <Campo
            id="pass"
            name="pass"
            label="Contraseña:"
            value={usuario.pass}
            onChange={changeHandler}
            type="password"
          />

          <Campo
            id="cpass"
            name="cpass"
            label="Confirmar contraseña:"
            value={usuario.cpass}
            onChange={changeHandler}
            type="password"
          />

          <input
            name="login"
            id="login"
            className="btn btn-primary mt-3 fs-5"
            type="button"
            value="Enviar"
          />
        </form>
      </div>
    </div>
  )
}

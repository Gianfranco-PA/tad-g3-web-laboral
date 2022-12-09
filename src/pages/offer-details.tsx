import Link from 'next/link'
import { FormEvent, useState } from 'react'
import background from 'src/common/assets/images/Login_espacio.jpeg'


interface CampoVar {
  value: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
  label: string
  id: string
  name: string
  placeholder?: string  
  type: 'text' | 'password'
}




const Campo = (props: CampoVar) => {
  return (
    <div className="form-group w-75">
      <label htmlFor={props.id} className="fs-4 fw-bold">
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

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
      className="vw-100 vh-50 d-flex justify-content-center "
    >
      <div
        className="w-50 h-20 d-flex flex-column justify-content-center  rounded-5"
        style={{ backgroundColor: 'white'}}
      >
        <form className="w-100 d-flex flex-column justify-content-center"  style={{width:"50%",  float:"left"}}>

          <h2>Detalles</h2>
          <br></br>
          <div className="form-row form-input-name-row">
            <p><span>EMPRESA:</span>...placeholder</p>
          </div>

          <div className="form-row form-input-name-row">
            <p><span>Se Necesita:</span>...placeholder</p>
          </div>

          <div className="form-row form-input-name-row">
            <p><span>Requerimientos:</span>...placeholder</p>
          </div>

          <div className="form-row form-input-name-row">
            <p><span>Conocimientos:</span>...placeholder</p>
          </div>

          <div className="form-row form-input-name-row">
            <p><span>Idioma:</span>...placeholder</p>
          </div>

          <div className="form-row form-input-name-row">
            <p><span>Estudios minimos:</span>...placeholder</p>
          </div>

          <h2>Resumen de Oferta</h2>

          <div className="form-row form-input-name-row">
            <p><span>Nombre de la Empresa:</span>...</p>
          </div>

          <div className="form-row form-input-name-row">y
            <p><span>Lugar:</span>...</p>
          </div>

          <div className="form-row form-input-name-row">
            <p><span>Puestos:</span>...</p>
          </div>

          <div className="form-row form-input-name-row">
            <p><span>Jornada Laboral:</span>...</p>
          </div>

          <div className="form-row form-input-name-row">
            <p><span>Area:</span>...</p>
          </div>

          <input
            name="login"
            id="login"
            className="btn btn-primary mt-3 fs-5"
            type="button"
            value="Registrar Postulacion"
          />

        </form>

      </div>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from 'src/common/assets/images/Logo.png'
import { showRoutesNavbar } from 'src/common/utils/constans/routesProject'
import { isEmpresaData } from 'src/common/utils/validations/empresa'
import { useLoginContext } from 'src/hook/useLogin'
import ItemNavbar from './itemNavbar'

export default function Navbar() {
  const router = useRouter()
  const loginData = useLoginContext()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand" style={{ width: 100 }}>
            <Image src={Logo} alt="Logo" layout="responsive" />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav d-flex justify-content-end">
            {showRoutesNavbar.map((elem, index) => {
              if (
                elem.label === 'Mis Ofertas' &&
                !isEmpresaData(loginData.user)
              )
                return null
              return (
                <ItemNavbar
                  key={index}
                  name={elem.label}
                  href={elem.href}
                  active={router.asPath === elem.href}
                />
              )
            })}
          </ul>
          <div className="d-flex justify-content-end ms-auto">
            {loginData.user ? <Logueado /> : <NoLogueado />}
          </div>
        </div>
      </div>
    </nav>
  )
}

const NoLogueado = () => {
  return (
    <>
      <Link href="/login">
        <a className="btn btn-primary mx-2">Iniciar Sesión</a>
      </Link>
      <Link href="/registro-persona">
        <a className="btn btn-danger mx-2">Registrarse como persona</a>
      </Link>
      <Link href="/registro-empresa">
        <a className="btn btn-danger mx-2">Registrarse como empresa</a>
      </Link>
    </>
  )
}

const Logueado = () => {
  const loginData = useLoginContext()
  return (
    <>
      <Link href="/perfil">
        <a className="btn btn-primary mx-2">Perfil</a>
      </Link>
      <button
        className="btn btn-danger mx-2"
        onClick={() => loginData.onChangeUser!(null)}
      >
        Cerrar sesión
      </button>
    </>
  )
}

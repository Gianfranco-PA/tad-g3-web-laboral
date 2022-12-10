import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { showRoutesPage } from 'src/common/utils/constans/routesProject'
import { initialUser, LoginContext } from 'src/hook/useLogin'
import { EmpresaTypeData } from 'src/modules/mongodb/schema/empresaModel'
import { PersonaTypeData } from 'src/modules/mongodb/schema/personaModel'
import Navbar from '../navbar/navbar'


interface layoutPrincipalProps {
  children: React.ReactNode
}

export default function PrincipalLayout({ children }: layoutPrincipalProps) {
  const [user, setUser] = useState<PersonaTypeData | EmpresaTypeData | null>(
    null,
  )
  const router = useRouter()
  const page = showRoutesPage.find((elem) => elem.href === router.pathname)

  const storageUser = (e: PersonaTypeData | EmpresaTypeData | null) => {
    localStorage.setItem('user', JSON.stringify(e))
    // console.log(e)
    setUser(e)
  }

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap')
    setUser(initialUser())
  }, [])
  return (
    <>
      <Head>
        <title>{page?.title}</title>
        <meta name="author" content="G3" />
        <meta
          name="description"
          content="Portal Web de empleo para estudiantes egresados de la educación superior en el Perú"
        />
        <meta
          name="keywords"
          content="Empleo,Estudiante,Laboral,Empleabilidad,Portal Web, Egresados, Educación superior, Perú"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <LoginContext.Provider
          value={{ user: user, onChangeUser: storageUser }}
        >
          {page?.navbar && <Navbar />}
          {children}
        </LoginContext.Provider>
      </main>
    </>
  )
}

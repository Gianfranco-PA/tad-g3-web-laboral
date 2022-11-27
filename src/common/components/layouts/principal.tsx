import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { showRoutesPage } from 'src/common/utils/constans/routesProject'
import Navbar from '../navbar/navbar'

interface layoutPrincipalProps {
  children: React.ReactNode
}

export default function PrincipalLayout({ children }: layoutPrincipalProps) {
  const router = useRouter()
  const page = showRoutesPage.find((elem) => elem.href === router.pathname)
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap')
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
        {page?.navbar && <Navbar />}
        {children}
      </main>
    </>
  )
}

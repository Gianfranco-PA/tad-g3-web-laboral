interface RoutesNavbarType {
  label: string
  href: string
}

export const showRoutesNavbar: Array<RoutesNavbarType> = [
  { label: 'Inicio', href: '/' },
  { label: 'Empleos', href: '/buscar-oferta' },
]

interface RoutesPageType {
  href: string
  title: string
  navbar?: boolean
}

export const showRoutesPage: Array<RoutesPageType> = [
  { title: 'UNITJob', href: '/', navbar: true },
  { title: 'Buscar Empleo', href: '/buscar-oferta', navbar: true },
  { title: 'Iniciar sesión', href: '/login' },
  { title: 'Registrar Empresa', href: '/registro-empresa' },
]

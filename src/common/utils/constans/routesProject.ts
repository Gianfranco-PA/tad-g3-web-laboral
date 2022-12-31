interface RoutesNavbarType {
  label: string
  href: string
}

export const showRoutesNavbar: Array<RoutesNavbarType> = [
  { label: 'Inicio', href: '/' },
  { label: 'Empleos', href: '/buscar-oferta' },
  { label: 'Mis Ofertas', href: '/crud' },
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
  { title: 'Registrar Persona', href: '/registro-persona' },
  { title: 'Perfil', href: '/perfil', navbar: true },
  { title: 'Ofertas', href: '/crud', navbar: true },
  { title: 'Detalle', href: '/oferta', navbar: true },
]

import Link from 'next/link'
import { useRouter } from 'next/router'

export interface ItemNavbarType {
  name: string
  href: string
  active?: boolean
}

export default function ItemNavbar({
  name,
  href,
  active = false,
}: ItemNavbarType) {
  const router = useRouter()
  return (
    <li className="nav-item">
      <Link href={href}>
        <a className={'nav-link' + (active ? ' active' : '')}>{name}</a>
      </Link>
    </li>
  )
}

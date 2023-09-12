import { urls } from '@libs/routes'
import Link from 'next/link'

export const Nav = () => {
  return (
    <nav className="bg-slate-400 p-5">
      <Link href={urls.HOME()}>Home</Link>
    </nav>
  )
}

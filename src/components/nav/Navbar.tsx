import { urls } from '@libs/routes'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className="flex p-5 bg-slate-400 space-x-2">
      <div className="basis-10/12">
        <Link href={urls.HOME()}>Home</Link>
      </div>
      <div className="flex flex-row justify-end basis-2/12">
        <Link href={urls.SIGN_IN()}>Sign In</Link>
      </div>
    </nav>
  )
}

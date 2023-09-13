import { SignOutButton } from '@components/auth/SignOutButton'
import { getServerSession } from '@libs/auth'
import { urls } from '@libs/routes'
import Link from 'next/link'

export const NavbarSignSection = async () => {
  const session = await getServerSession()

  if (!session) {
    return (
      <>
        <Link href={urls.SIGN_IN()}>Sign In</Link>
      </>
    )
  }

  return <SignOutButton />
}

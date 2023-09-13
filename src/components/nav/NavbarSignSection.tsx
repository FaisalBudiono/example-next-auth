'use client'

import { urls } from '@libs/routes'
import Link from 'next/link'

export const NavbarSignSection = () => {
  return (
    <>
      <Link href={urls.SIGN_IN()}>Sign In</Link>
    </>
  )
}

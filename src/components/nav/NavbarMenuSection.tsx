'use client'

import { urls } from '@libs/routes'
import Link from 'next/link'

export const NavbarMenuSection = () => {
  return (
    <>
      <Link href={urls.HOME()}>Home</Link>
      <Link href={urls.ADMIN()}>Admin Page</Link>
      <Link href={urls.GUEST()}>Guest</Link>
    </>
  )
}

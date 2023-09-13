'use client'

import { urls } from '@libs/routes'
import { signOut } from 'next-auth/react'

export const SignOutButton = () => {
  return (
    <button
      onClick={async () => {
        await signOut({
          callbackUrl: urls.HOME(),
          redirect: true,
        })
      }}
    >
      Sign Out
    </button>
  )
}

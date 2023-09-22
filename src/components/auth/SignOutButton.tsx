'use client'

import { useAuth } from '@libs/hooks/auth'
import { urls } from '@libs/routes'

export const SignOutButton = () => {
  const { signOut } = useAuth()

  return (
    <button
      onClick={async () => {
        await signOut({
          callbackURL: urls.HOME(),
          needRedirect: true,
        })
      }}
    >
      Sign Out
    </button>
  )
}

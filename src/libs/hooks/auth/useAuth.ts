'use client'

import { axios } from '@libs/api'
import { apiUrls, urls } from '@libs/routes'
import { isAxiosError } from 'axios'
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession,
} from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

interface Credentials {
  email: string
  password: string
}

type SignOutOptions = {
  callbackURL?: string
  needRedirect?: boolean
}
type SignOut = (options?: SignOutOptions) => Promise<void>

export const useAuth = () => {
  const searchParam = useSearchParams()
  const { data: session } = useSession()

  const signIn = async ({ email, password }: Credentials) => {
    await nextAuthSignIn('credentials', {
      email,
      password,
      callbackUrl: searchParam.get('callbackUrl') ?? urls.HOME(),
      redirect: true,
    })
  }

  const signOut: SignOut = async (options = {}) => {
    const { callbackURL, needRedirect } = options

    try {
      await axios.post(apiUrls.logout(), {
        refreshToken: session?.token?.refreshToken,
      })

      await nextAuthSignOut({
        callbackUrl: callbackURL ?? urls.SIGN_IN(),
        redirect: needRedirect ?? true,
      })
    } catch (error) {
      if (isAxiosError(error)) {
        await nextAuthSignOut({
          callbackUrl: callbackURL ?? urls.SIGN_IN(),
          redirect: needRedirect ?? true,
        })
      }
    }
  }

  return { signIn, signOut }
}

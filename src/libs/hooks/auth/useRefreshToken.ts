'use client'

import { APISingleResponse } from '@libs/api'
import { TokenResponse, UserTokenBundle } from '@libs/auth'
import { apiUrls, urls } from '@libs/routes'
import { Subset } from '@libs/typescript-support'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'

type UpdateToken = Subset<UserTokenBundle>

export const useRefreshToken = () => {
  const { data: session, update } = useSession()

  const updateSessionOnServer = async (updatedSession: UpdateToken) => {
    await update(updatedSession)
  }
  const updateSessionOnClient = async (updatedSession: UpdateToken) => {
    if (session?.token !== undefined) {
      session.token = {
        accessToken:
          updatedSession.token?.accessToken ?? session.token.accessToken,
        refreshToken:
          updatedSession.token?.refreshToken ?? session.token.refreshToken,
      }
    }
  }

  const generateRefreshToken = async () => {
    try {
      const res = await axios.post<APISingleResponse<TokenResponse>>(
        apiUrls.refreshToken(),
        {
          refreshToken: session?.token?.refreshToken,
        },
      )
      const { accessToken, refreshToken } = res.data.data

      const updatedSession: UpdateToken = {
        token: {
          accessToken,
          refreshToken,
        },
      }

      await updateSessionOnServer(updatedSession)
      await updateSessionOnClient(updatedSession)
    } catch (error) {
      signOut({
        callbackUrl: urls.SIGN_IN(),
        redirect: true,
      })
    }
  }

  return generateRefreshToken
}
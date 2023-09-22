'use client'

import { APISingleResponse, axios } from '@libs/api'
import { TokenResponse, UserTokenBundle } from '@libs/auth'
import { apiUrls, urls } from '@libs/routes'
import { Subset } from '@libs/typescript-support'
import { signOut, useSession } from 'next-auth/react'

type UpdateToken = Subset<UserTokenBundle>
type Action = 'start' | 'finish'
const refreshTokenRequests: number[] = []

export const useRefreshToken = () => {
  const { data: session, update } = useSession()

  const broadcastRefreshAction = new BroadcastChannel('jwt-refresh-action')
  broadcastRefreshAction.addEventListener('message', (e) => {
    const action = e.data as Action

    if (action === 'start') {
      refreshTokenRequests.push(1)
      return
    }

    refreshTokenRequests.shift()
  })

  const broadcastToken = new BroadcastChannel('jwt-token')
  broadcastToken.addEventListener('message', (e) => {
    const updatedSession = e.data as UpdateToken

    if (session?.token !== undefined) {
      session.token = {
        accessToken:
          updatedSession.token?.accessToken ?? session.token.accessToken,
        refreshToken:
          updatedSession.token?.refreshToken ?? session.token.refreshToken,
      }
    }
  })

  const tokenManager = {
    isRefreshing() {
      return refreshTokenRequests.length !== 0
    },
    start() {
      refreshTokenRequests.push(1)
      broadcastRefreshAction.postMessage('start' as Action)
    },
    finish() {
      refreshTokenRequests.shift()
      broadcastRefreshAction.postMessage('finish' as Action)
    },
  }

  const updateSessionOnServer = async (updatedSession: UpdateToken) => {
    await update(updatedSession)
  }
  const updateSessionOnClient = async (updatedSession: UpdateToken) => {
    broadcastToken.postMessage(updatedSession)
  }

  const generateRefreshToken = async () => {
    try {
      if (tokenManager.isRefreshing()) {
        return
      }
      tokenManager.start()

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

      tokenManager.finish()
    } catch (error) {
      await signOut({
        callbackUrl: urls.SIGN_IN(),
        redirect: true,
      })
    }
  }

  return generateRefreshToken
}

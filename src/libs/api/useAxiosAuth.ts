'use client'

import { useRefreshToken } from '@libs/auth/useRefreshToken'
import axios, { isAxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { axiosConfig } from '.'

const axiosAuth = axios.create(axiosConfig)

export const useAxiosAuth = () => {
  const { data: session } = useSession()
  const refreshToken = useRefreshToken()

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${session?.token?.accessToken}`

      return config
    })

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!isAxiosError(error)) {
          throw error
        }

        const prevRequest = error.config
        if (prevRequest === undefined) {
          throw error
        }

        const isUnauthorizedError = error.response?.status === 401
        if (isUnauthorizedError) {
          await refreshToken()

          prevRequest.headers.Authorization = `Bearer ${session?.token?.accessToken}`
          return axiosAuth(prevRequest)
        }

        throw error
      },
    )

    return () => {
      axios.interceptors.request.eject(requestIntercept)
      axios.interceptors.response.eject(responseIntercept)
    }
  }, [session?.token?.accessToken, refreshToken])

  return axiosAuth
}

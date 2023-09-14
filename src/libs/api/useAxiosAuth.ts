'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { axiosConfig } from '.'

const axiosAuth = axios.create(axiosConfig)

export const useAxiosAuth = () => {
  const { data: session, update } = useSession()

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${session?.token?.accessToken}`

      return config
    })

    return () => {
      axios.interceptors.request.eject(requestIntercept)
    }
  }, [session?.token?.accessToken])

  return axiosAuth
}

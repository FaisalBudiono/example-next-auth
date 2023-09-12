import { CreateAxiosDefaults, default as realAxios } from 'axios'

export const axiosConfig: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

export const axios = realAxios.create(axiosConfig)

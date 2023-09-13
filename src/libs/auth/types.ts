export type LoginRequest = {
  email: string
  password: string
}

export type TokenResponse = {
  type: 'Bearer'
  accessToken: string
  refreshToken: string
}

export interface UserTokenBundle {
  user?: UserSession
  token?: TokenSession
}

export type UserSession = {
  id: string
  name: string
  email: string
}

export type TokenSession = {
  accessToken: string
  refreshToken: string
}

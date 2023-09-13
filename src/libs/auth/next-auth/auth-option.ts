import { APISingleResponse, axios } from '@libs/api'
import { apiUrls, urls } from '@libs/routes'
import { UserResponse } from '@libs/user-profile'
import { AxiosError } from 'axios'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { LoginRequest, TokenResponse, TokenSession, UserSession } from '..'

const fetchToken = async ({
  email,
  password,
}: LoginRequest): Promise<TokenResponse> => {
  const tokenRes = await axios.post<APISingleResponse<TokenResponse>>(
    apiUrls.login(),
    {
      email,
      password,
    },
  )

  return tokenRes.data.data
}

const fetchUser = async (accessToken: string): Promise<UserResponse> => {
  const userRes = await axios.get<APISingleResponse<UserResponse>>(
    apiUrls.me(),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return userRes.data.data
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'JWT',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const token = await fetchToken({
            email: credentials?.email ?? '',
            password: credentials?.password ?? '',
          })

          const user = await fetchUser(token.accessToken)

          return {
            id: user.id.toString(),
            user: {
              ...user,
              id: user.id.toString(),
            },
            token,
          }
        } catch (error: AxiosError | any) {
          return null
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, trigger }) {
      const isSuccessSignin = trigger === 'signIn' && user
      if (isSuccessSignin) {
        return {
          sub: user.id.toString(),
          name: user.name,
          email: user.email,
          user: user.user,
          token: user.token,
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        expires: session.expires,
        token: token.token as TokenSession,
        user: token.user as UserSession,
      }
    },
  },

  debug: process.env.NODE_ENV === 'development',

  pages: {
    signIn: urls.SIGN_IN(),
  },
}

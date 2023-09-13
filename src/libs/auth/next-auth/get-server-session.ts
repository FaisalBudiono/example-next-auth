import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import { authOptions } from '.'

export const getServerSession = async () =>
  await nextAuthGetServerSession(authOptions)

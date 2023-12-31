import { UserTokenBundle } from '@libs/auth'
import 'next-auth'

declare module 'next-auth' {
  interface JWT extends UserTokenBundle {}

  interface User extends UserTokenBundle {}

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends UserTokenBundle {}
}

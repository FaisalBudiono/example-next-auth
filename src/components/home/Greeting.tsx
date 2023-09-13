import { getServerSession } from '@libs/auth'

export const Greeting = async () => {
  const session = await getServerSession()
  const name = session?.user?.name

  const greeting = name ? `Hello, ${name}` : 'You are not logged in yet'

  return <>{greeting}</>
}

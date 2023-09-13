import { SignInForm } from '@components/auth'

export default function LoginPage() {
  return (
    <main className="flex flex-row items-center justify-center container mx-auto mt-3">
      <div className="basis-1/2">
        <SignInForm />
      </div>
    </main>
  )
}

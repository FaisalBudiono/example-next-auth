import { ButtonSubmit } from '@components/common'

export const SignInForm = () => {
  return (
    <div className="flex flex-col border-2 border-white p-4 space-y-3">
      <h1 className="font-bold text-2xl text-center p-2">Login</h1>
      <hr />
      <span className="flex flex-col">
        <label>Email</label>
        <input type="email" name="email" />
      </span>
      <span className="flex flex-col">
        <label>Password</label>
        <input type="password" name="password" />
      </span>
      <hr />
      <ButtonSubmit>Login</ButtonSubmit>
    </div>
  )
}

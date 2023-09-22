'use client'

import { ButtonSubmit } from '@components/common'
import { LoginRequest } from '@libs/auth'
import { useAuth } from '@libs/hooks/auth'
import { SubmitHandler, useForm } from 'react-hook-form'

export const SignInForm = () => {
  const { signIn } = useAuth()

  const { register, handleSubmit } = useForm<LoginRequest>()

  const onSubmit: SubmitHandler<LoginRequest> = async ({ email, password }) => {
    await signIn({
      email,
      password,
    })
  }

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col border-2 border-white p-4 space-y-3">
        <h1 className="font-bold text-2xl text-center p-2">Login</h1>
        <hr />
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="text-black"
            id="email"
            type="email"
            {...register('email')}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="text-black"
            id="password"
            type="password"
            {...register('password')}
          />
        </div>
        <hr />
        <ButtonSubmit>Login</ButtonSubmit>
      </div>
    </form>
  )
}

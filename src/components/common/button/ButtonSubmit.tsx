import { ComponentPropsWithoutRef } from 'react'

type Props = Omit<ComponentPropsWithoutRef<'button'>, 'type'>

export const ButtonSubmit = ({ children, className, ...props }: Props) => {
  return (
    <button
      type="submit"
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

import { NavbarMenuSection, NavbarSignSection } from '.'

export const Navbar = () => {
  return (
    <nav className="flex p-5 bg-slate-400 space-x-2">
      <div className="basis-10/12 space-x-2">
        <NavbarMenuSection />
      </div>
      <div className="flex flex-row justify-end basis-2/12">
        <NavbarSignSection />
      </div>
    </nav>
  )
}

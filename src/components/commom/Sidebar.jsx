import {

  X,
  Users,
  Stethoscope,
  ShieldIcon,
  CalendarDays,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { usePathname } from "next/navigation"
import { assets } from "../../../public/assets/assets_frontend/assets"

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname()

  const links = [
      { href: "/Admin", label: "Patients", icon: <Users /> },
    { href: "/Admin/Doctor", label: "Doctors", icon: <Stethoscope/>},
    { href: "/Admin/Appointment", label: "Appointments", icon: <CalendarDays/> },
    
  ]

  return (
    <>
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black/40 lg:hidden z-40 ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-50 lg:static top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b lg:hidden">
          <Image src={assets.logo} alt="logo" width={150} height={150} />
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="h-full flex flex-col justify-between bg-white text-black">
          <div className="flex flex-col gap-6">
            <div className="hidden lg:flex  p-6">
              <Image src={assets.logo} alt="logo" width={135} height={100} />
            </div>

            <div className="p-4 flex flex-col gap-2">
              {links.map(({ href, label, icon }) => (
                <Link
                onClick={() => setOpen(false)}
                  key={href}
                  href={href}
                  className={`p-2 rounded flex items-center gap-2 font-medium transition duration-300 ${
                    pathname === href
                      ? "bg-[#6A61F5] text-white"
                      : "hover:bg-[#6A61F5] hover:text-white"
                  }`}
                >
                  {icon} {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}

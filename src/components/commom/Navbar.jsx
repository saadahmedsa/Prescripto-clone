"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { assets } from '../../../public/assets/assets_frontend/assets'
import { usePathname } from 'next/navigation'


const Navbar = () => {
const {isSignedIn}=useUser()
let isActive;
const NavLink = ({ href, children }) => {
  const pathname = usePathname();
   isActive = pathname === href;

  return (
    <Link href={href}>
              {children}
              <hr className={`border-none outline-none h-1 bg-primary w-3/5 m-auto  ${isActive ? "block" : "hidden"}`}/>
    </Link>
  );
};
  return (
    <div className='py-5 mb-5 text-sm flex justify-between items-center border-b border-b-gray-500'>
       <Image src={assets.logo} width={44} height={40} alt='logo' className=' w-44 cursor-pointer'/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
          <li><NavLink  href={"/"}>HOME</NavLink></li>
          <li><NavLink href={"/About"}>ABOUT</NavLink></li>
          <li><NavLink href={"/Doctors"}>ALL DOCTORS</NavLink></li>
          <li><NavLink href={"/Contact"}>CONTACT</NavLink></li>
        </ul>
        <div>
        {
          isSignedIn ? <div className='flex gap-2 items-center'>
                <Link href={"/Myappointment"}>My Appointment</Link>
                 <UserButton/>    
        </div>:
        <Button className="rounded-full"><Link href={"/sign-in"}>Create Account</Link></Button>
      }
      </div>
    </div>
  )
}

export default Navbar
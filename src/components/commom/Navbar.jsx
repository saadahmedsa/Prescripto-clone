"use client";

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { assets } from '../../../public/assets/assets_frontend/assets';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, children,onClick }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} onClick={onClick} className='relative'>
        {children}
        <hr className={`absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 h-[2px] w-3/5 bg-primary border-none ${isActive ? "block" : "hidden"}`} />
      </Link>
    );
  };

  return (
    <div className='py-5 mb-5 text-sm flex justify-between items-center border-b border-b-gray-300 px-4 md:px-10'>
      <Image src={assets.logo} width={44} height={40} alt='logo' className='w-44 sm:w-32 cursor-pointer' />

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-center gap-6 font-medium'>
        <li><NavLink href="/">HOME</NavLink></li>
        <li><NavLink href="/About">ABOUT</NavLink></li>
        <li><NavLink href="/Doctors">ALL DOCTORS</NavLink></li>
        <li><NavLink href="/Contact">CONTACT</NavLink></li>
      </ul>

      {/* Right Side Buttons */}
      <div className='flex items-center gap-4'>
        {isSignedIn ? (
          <>
            <Link className='hidden md:flex' href="/Myappointment">My Appointment</Link>
            <UserButton />
            <Image
              onClick={() => setMenu(true)}
              className='md:hidden w-6 cursor-pointer'
              src={assets.menu_icon}
              alt='menu'
              height={24}
              width={24}
            />
          </>
        ) : (
          <Button className="rounded-full ">
            <Link href="/sign-in">login</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`fixed md:hidden top-0 right-0 h-full w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${menu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex items-center justify-between p-5 border-b'>
          <Image className='w-36' src={assets.logo} alt='logo' height={24} width={24} />
          <Image onClick={() => setMenu(false)} className='w-7 cursor-pointer' src={assets.cross_icon} alt='close' height={24} width={24} />
        </div>
        <ul className='flex flex-col gap-5 p-5 font-medium'>
          <li><NavLink onClick={() => setMenu(false)} href="/">HOME</NavLink></li>
          <li><NavLink onClick={() => setMenu(false)} href="/About">ABOUT</NavLink></li>
          <li><NavLink onClick={() => setMenu(false)} href="/Doctors">ALL DOCTORS</NavLink></li>
          <li ><NavLink onClick={() => setMenu(false)}  href="/Contact">CONTACT</NavLink></li>
          {isSignedIn && <li><Link onClick={() => setMenu(false)} href="/Myappointment">My Appointment</Link></li>}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react'
import Image from 'next/image'
import { assets } from '../../../public/assets/assets_frontend/assets'
import Link from 'next/link'

const Banner = () => {
  return (
    <div className='flex  bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
            <div className='text-white text-2xl md:text-4xl mb-5 font-semibold leading-12'>
                <p>Book Appointment</p>
                <p>With 100+ Trusted Doctors</p>
            </div>
            <Link href={"/sign-in"} className={"bg-white text-sm  mt-10 px-8 py-2 hover:scale-105 transition-all duration-500 rounded-full text-black"}>Create Account</Link>
        </div>
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <Image className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt='appointment image' width={300} height={300}/>
        </div>
    </div>
  )
}

export default Banner
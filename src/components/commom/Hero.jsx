import Image from 'next/image'
import React from 'react'
import { assets } from '../../../public/assets/assets_frontend/assets'
import Link from 'next/link'
import { ArrowBigRight } from 'lucide-react'

const Hero = () => {
  return (
    <div className='bg-primary flex flex-col md:flex-row flex-wrap  rounded-lg px-6  md:px-10 lg:px-16'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vw] md:mb-[-30px]   m-auto '>
            <p className='text-3xl md:text-4xl lg:text-5xl  text-white font-semibold leading-tight'>Book Appointment <br/> With Trusted Doctors</p>
          <div className='flex flex-col items-start j gap-2 md:flex-row text-white text-sm'>
          <Image src={assets.group_profiles} alt='' width={100} height={100}/>
            <p>Simply browse through our extensive list of trusted doctors,<br/>
            schedule your appointment hussle-free</p>
          </div>
            <div  >
            <a href="#speciality"className='flex items-center text-sm hover:scale-105 transition-all duration-500  gap-2 bg-white px-8 py-2 rounded-full'>
            Book Appointment
             <ArrowBigRight />
            </a>
            </div>
        </div>
        <div className='md:w-1/2 relative  '>
            <Image src={assets.header_img} className='w-full md:absolute bottom-0 rounded-lg h-auto' width={500} height={500} alt='header'/>
        </div>
    </div>
  )
}

export default Hero
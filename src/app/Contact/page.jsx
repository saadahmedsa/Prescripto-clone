import Image from 'next/image'
import React from 'react'
import { assets } from '../../../public/assets/assets_frontend/assets'

const page = () => {
  return (
    <div>
       <div>
      <div className='text-center text-2xl text-gray-500 my-10'>
        <p>Contact <span className='font-medium text-gray-700'>US</span></p>
      </div>
      </div>
      <div className='my-20 flex flex-col md:flex-row justify-center  gap-10 mb-10 text-sm '>
        <Image className='w-full md:max-w-[360px]' src={assets.contact_image} alt='image' width={400} height={400}/>
        <div className='flex flex-col py-4 items-start gap-6 '>
          <b className='text-lg'>OUR OFFICE</b>
          <p>54700 Willims Station <br /> Suite 250, Ontario, Canada</p>
          <p>Tel : (415) 555-1231 <br /> Email: prescripto@gmail.com</p>
          <p className='text-xl font-bold'>CAREERS AT PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border-2 border-black hover:bg-black hover:text-white transition-all duration-500 cursor-pointer px-5 py-5'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default page
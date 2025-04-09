import Image from 'next/image'
import React from 'react'
import { assets } from '../../../public/assets/assets_frontend/assets'

const page = () => {
  return (
    <div>
      <div className='text-center text-2xl text-gray-500 my-10'>
        <p>About <span className='font-medium text-gray-700'>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row gap-10 my-5'>
        <Image className='w-full md:max-w-[300px]'  src={assets.about_image} alt="doctor" width={300} height={300} />
      <div className='flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-500'>
        <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
        <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
      </div>
      </div> 
      <div className=' text-2xl text-gray-500 my-10'>
        <p>WHY  <span className='font-medium text-gray-700'>CHOOSE US</span></p>
      </div>   
      <div className='flex flex-col md:flex-row gap-6 my-20'>
       <div className='border px-10 md:px-16 py-8 sm:py-14 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>EFFICIENCY:</b>
        <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
       </div>
       <div className='border px-10 md:px-16 py-8 sm:py-14 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>CONVENIENCE:</b>
        <p>Access to a network of trusted healthcare professionals in your area.</p>
       </div>
       <div className='border px-10 md:px-16 py-8 sm:py-14 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>PERSONALIZATION:</b>
        <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
       </div>
     
       </div> 
    </div>
  )
}

export default page
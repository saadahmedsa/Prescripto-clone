"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { doctors } from '../../../public/assets/assets_frontend/assets';
import { useRouter } from 'next/navigation';

const Topdoctor = () => {
    const router = useRouter()

  return (
    <div className='flex flex-col items-center gap-5 my-16 lg:mx-10 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium text-center'>Best Doctor for Appointment</h1>
      <p className=' text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
        {doctors.slice(0, 8).map((item, index) => (
          <div onClick={()=>router.push(`/Appointment/${item._id}`)}  key={index} className='border border-blue-200 rounded-xl cursor-pointer hover:translate-y-[-5px] transition-transform duration-300 shadow-md'>
            <Image className='bg-blue-50 w-full h-auto rounded-t-xl' src={item.image} width={300} height={300} alt={item.name} />
            <div className='p-4 '>
              <div className='flex  items-center gap-2 text-sm text-green-500'>
                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                <p>Available</p>
              </div>
              <p className='font-semibold'>{item.name}</p>
              <p className='text-gray-600'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Button onClick={()=>router.push("/Doctors")} variant={"outline"} className='mt-10 px-6 py-2 bg-blue-50'>See more</Button>
    </div>
  );
};

export default Topdoctor;
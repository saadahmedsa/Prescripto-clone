"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { doctors } from '../../../public/assets/assets_frontend/assets';
import { useRouter } from 'next/navigation';
import Card from './Card';

const Topdoctor = () => {
    const router = useRouter()

  return (
    <div className='flex flex-col items-center gap-5 my-16 lg:mx-10 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium text-center'>Best Doctor for Appointment</h1>
      <p className=' text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
        {doctors.slice(0, 8).map((item, index) => (
          <Card item={item} key={item._id}/>
        ))}
      </div>
      
      <Button onClick={()=>router.push("/Doctors")} variant={"outline"} className='mt-10 px-6 py-2 bg-blue-50'>See more</Button>
    </div>
  );
};

export default Topdoctor;
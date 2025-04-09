import React from 'react';
import { specialityData } from '../../../public/assets/assets_frontend/assets';
import Link from 'next/link';
import Image from 'next/image';

const Specialty = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-4 py-8 md:py-16 text-gray-800 px-4 overflow-hidden' id='speciality'>
      <h1 className='text-2xl sm:text-3xl font-medium text-center'>Find Doctor By Your Disease</h1>
      <p className='text-center text-sm sm:text-base max-w-lg'>
        Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
      </p>
      <div className='flex flex-wrap sm:justify-center gap-4 pt-5 w-full overflow-y-auto'>
        {
          specialityData.map((item, index) => (
            <Link key={index} href={`/Doctors/${item.speciality}`} className='flex flex-col items-center text-xs cursor-pointer transition-transform duration-500 hover:-translate-y-2'>
                <Image 
                  src={item.image} 
                  width={100} 
                  height={100} 
                  alt={item.speciality} 
                />
                <p className='mt-2 text-center'>{item.speciality}</p>
            </Link>
          ))
        
        }
      </div>
    </div>
  );
};

export default Specialty;
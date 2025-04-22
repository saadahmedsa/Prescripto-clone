"use client"
import React from 'react'
import { doctors } from '../../../public/assets/assets_frontend/assets'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div>
      <p className='mt-5 pb-2 border-b-2 font-medium text-xl'>My Appointment</p>
      <div>
        {
          doctors.slice(0,3).map((item,index)=>{
          return <div key={index} className='flex justify-between flex-wrap items-center gap-10 border-b pb-2 my-10'>
              <div className='flex flex-wrap items-center gap-6'>
                <Image src={item.image} alt={item.name} width={200} height={200} className='w-40 bg-indigo-50'
            />
              <div className='mt-2 text-sm'>
                <p className="font-semibold text-lg">{item.name}</p>
                <p>{item.speciality}</p>
                <p className="font-medium mt-1">Address</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p><span className="font-semibold">Date & Time </span>:  12:30 12-4-2024</p>
              </div>
              </div>
              <div className='flex flex-col gap-4 text-sm justify-end'>
                <Button  className="hover:bg-white hover:text-black transition-all duration-300">Pay Online</Button>
                <Button variant={"outline"} className="hover:bg-red-300 hover:text-white  transition-all duration-300" >Cancel Appointment</Button>
                </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default page
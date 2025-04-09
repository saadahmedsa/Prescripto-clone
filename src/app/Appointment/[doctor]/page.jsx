"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { assets, doctors } from "../../../../public/assets/assets_frontend/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Page = () => {
  const {doctor}= useParams();
  
  const [doctorinfo, setDoctor] = useState(null);

  useEffect(() => {
    if (doctor) {
      const data = doctors.find((item) => item._id == doctor);
      console.log(data);
      
      setDoctor(data);
    }
  }, [doctor]); // ✅ Removed `doctors` from dependencies

  if (!doctorinfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    ); // ✅ Loader when doctor is `null`
  }

  return (
    <>
    <div className="flex flex-col sm:flex-row gap-5 p-5">
      <div className="border rounded-lg shadow-md p-5">
        <Image src={doctorinfo.image} alt="doctor image" width={400} height={400} className="rounded-lg  bg-primary" />
      </div>
       <div className="flex-1 border rounded-lg shadow-md p-5 py-10">
       <p className="text-xl font-semibold mt-3 md:mt-0 flex gap-2 items-center">
      <Image src={assets.verified_icon} alt="" width={20} height={20}/>{doctorinfo.name}</p>
      <div className="flex items-center gap-4 py-2">
      <p className="text-gray-900 text-lg">{doctorinfo.degree}-{doctorinfo.speciality}</p>
      <Button variant={"outline"} className="rounded-full text-gray-600">{doctorinfo.experience}</Button>
      </div>
       <div>
       <p className="text-gray-600 flex gap-2 py-2 items-center">About <Image src={assets.info_icon} width={20} height={20} alt=""/></p>
       <p className="text-gray-600">{doctorinfo.about}</p>
       </div>
       <p className="text-gray-900 text-lg py-4">Appointment fee: ${doctorinfo.fees}</p>
       <Button className="px-10 py-2 rounded-full">Book Appointment</Button>
       </div>

    </div>
    <div className='flex flex-col items-center gap-5 my-16 lg:mx-10 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium text-center'>Related Doctors</h1>
      <p className=' text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
                { doctors.filter(item => item.speciality === doctorinfo.speciality && item._id !== doctor).slice(0, 4).map((item, index) => (
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
   
      </div>
    </>
  );
};

export default Page;

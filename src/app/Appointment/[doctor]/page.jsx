"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { assets, doctors } from "../../../../public/assets/assets_frontend/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();
  const { doctor } = useParams();
  const [doctorinfo, setDoctor] = useState(null);
  const [slot, setslot] = useState([])
  const [indexslot, setindex] = useState(0)
  const [time, settime] = useState("")
  const days =["SUN","MON","TUE","WED","THU","FRI","SAT"]



  const getslot = async () => {
    setslot([])
    let today = new Date()
    for(let i = 0 ; i < 7 ; i++){
       let currentdate = new Date(today)
       currentdate.setDate(today.getDate() + i)
       let endtime = new Date()
       endtime.setDate(today.getDate() + i) 
       endtime.setHours(16,0,0,0)
       if(today.getDate() === currentdate.getDate()){
        currentdate.setHours(currentdate.getHours() > 10 ? currentdate.getHours() +1 : 10)
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0)
       }else{
         currentdate.setHours(10)
        currentdate.setMinutes(0)
       }
       let timeslot= []

       while(currentdate < endtime){
        let format = currentdate.toLocaleTimeString([],{ hour: "2-digit", minute :"2-digit",  hour12: true})
        timeslot.push({
          datetime : new Date(currentdate),
          time : format
        })
          currentdate.setMinutes(currentdate.getMinutes() +30 )
       }
       setslot(prev => ([...prev , timeslot]))
    }

  }

  useEffect(() => {
    getslot()
  },[doctorinfo]) 
  useEffect(() => {
    console.log(slot);
    
  },[slot]) 
  
  useEffect(() => {
    if (doctor) {
      const data = doctors.find((item) => item._id == doctor);
      setDoctor(data);
    }

   
  }, [doctor]);
  if (!doctorinfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    ); // ✅ Loader when doctor is `null`
  }

  return (
    <>
    
     <div className="flex flex-col md:flex-row gap-5 p-5">
  {/* Doctor Profile Image */}
  <div className="flex justify-center sm:justify-start border rounded-lg shadow-md p-3 sm:p-5 w-full sm:w-[40%]">
    <Image 
      src={doctorinfo.image} 
      alt="doctor image" 
      width={400} 
      height={400} 
      className="rounded-lg bg-primary object-cover w-full h-auto max-h-[400px]" 
    />
  </div>

  {/* Doctor Info */}
  <div className="flex-1 "> 
  <div className=" border rounded-lg shadow-md p-5  ">
    <p className="text-lg md:text-xl font-semibold mt-3 md:mt-0 flex gap-2 items-center flex-wrap">
      <Image src={assets.verified_icon} alt="" width={20} height={20} /> 
      {doctorinfo.name}
    </p>

    <div className="flex flex-wrap items-center gap-3 py-2">
      <p className="text-gray-900 text-base md:text-lg">
        {doctorinfo.degree} - {doctorinfo.speciality}
      </p>
      <Button variant="outline" className="rounded-full text-gray-600 text-sm md:text-base">
        {doctorinfo.experience}
      </Button>
    </div>

    <div>
      <p className="text-gray-600 flex gap-2 py-2 items-center">
        About <Image src={assets.info_icon} width={20} height={20} alt="" />
      </p>
      <p className="text-gray-600 text-sm md:text-base">{doctorinfo.about}</p>
    </div>

    <p className="text-gray-900 text-base md:text-lg pt-2">
      Appointment fee: <span className="font-medium">${doctorinfo.fees}</span>
    </p>

  
 <div className="p-5">
  <p className="font-semibold text-lg">Available Slots</p>

  {/* Days Row */}
  <div className="flex items-center w-full gap-3 my-4 overflow-x-auto pb-2">
    {slot.length > 0 ? (
      slot.map((item, index) => (
        <div
          key={index}
          onClick={() => setindex(index)}
          className={`min-w-16 px-2  py-3 rounded-full cursor-pointer text-center border shadow-sm transition-all 
            ${indexslot === index ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200 hover:bg-gray-100"}`}
        >
          <p className="text-sm font-medium">
            {item[0] && days[item[0].datetime.getDay()]}
          </p>
          <p className="text-lg font-semibold">
            {item[0] && item[0].datetime.getDate()}
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No slots available</p>
    )}
  </div>

  {/* Time Slots Row */}
  <div className="flex max-w-120 items-center gap-3 my-4 overflow-x-auto pb-2">
  {slot.length > 0 &&
    slot[indexslot].map((item, index) => (
      <button
        key={index}
        onClick={() => settime(item.time)}
        className={`px-4 py-2 flex-shrink-0 rounded-full text-sm font-medium border shadow-sm transition-all 
          ${time === item.time ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"}`}
      >
        {item.time.toLowerCase()}
      </button>
    ))}
</div>

  {/* Book Button */}
  <Button className="px-6 sm:px-10 py-3 rounded-full w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
    Book Appointment
  </Button>
</div>

  </div>
    </div>  

</div>

{/* Related Doctors Section */}
<div className="flex flex-col items-center gap-5 my-12 lg:mx-10 text-gray-800" id="speciality">
  <h1 className="text-2xl md:text-3xl font-medium text-center">Related Doctors</h1>
  <p className="text-center text-sm md:text-base">Simply browse through our extensive list of trusted doctors.</p>

  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 pt-5 px-3 sm:px-0">
    {doctors
      .filter(item => item.speciality === doctorinfo.speciality && item._id !== doctor)
      .slice(0, 4)
      .map((item, index) => (
        <div
          key={index}
          onClick={() => router.push(`/Appointment/${item._id}`)}
          className="border border-blue-200 rounded-xl cursor-pointer hover:translate-y-[-5px] transition-transform duration-300 shadow-md"
        >
          <Image 
            className="bg-blue-50 w-full h-56 sm:h-64 object-cover rounded-t-xl" 
            src={item.image} 
            width={300} 
            height={300} 
            alt={item.name} 
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p>Available</p>
            </div>
            <p className="font-semibold text-sm md:text-base">{item.name}</p>
            <p className="text-gray-600 text-sm">{item.speciality}</p>
          </div>
        </div>
      ))}
  </div>
</div>
</>
  );
};

export default Page;

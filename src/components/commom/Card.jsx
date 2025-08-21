

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Card = ({item} ) => {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push(`/Appointment/${item._id}`)}
         
            className="border border-blue-200 rounded-xl cursor-pointer hover:translate-y-[-5px] transition-transform duration-300 shadow-md"
        >
            <Image className="bg-blue-50 w-full h-auto rounded-t-xl" src={item.image} width={300} height={300} alt={item.name} />
            <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p>Available</p>
                </div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.speciality}</p>
            </div>
        </div>
    )
}

export default Card
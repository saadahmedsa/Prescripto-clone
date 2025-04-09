"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { doctors } from "../../../../public/assets/assets_frontend/assets";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { speciality } = useParams();
  const decodedSpeciality = speciality ? decodeURIComponent(speciality) : ""; // ✅ Decodin
  const [filter, setFilter] = useState(""); // ✅ Default is empty (no filter)
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    let filteredDoctors = doctors;

    if (speciality) {
      filteredDoctors = doctors.filter((item) => item.speciality === speciality);
    }

    if (filter) {
      filteredDoctors = doctors.filter((item) => item.speciality === filter);
    }

    setDoctor(filteredDoctors);
  }, [speciality, filter]); // ✅ Runs when either 'speciality' or 'filter' changes

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors Speciality.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Sidebar Filters */}
        <div className="md:w-1/4 flex flex-col gap-4 text-sm text-gray-600">
          {["General physician", "Gynecologist", "Dermatologist", "Neurologist", "Pediatricians"].map((spec) => (
            <p
              key={spec}
              onClick={() => setFilter(spec)}
              className={`w-[84vw] sm:w-auto pl-3 py-1.5 pr-10 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200 ${
                filter === spec ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              {spec}
            </p>
          ))}
          <p
            onClick={() => setFilter("")} // Reset filter
            className="w-[84vw] sm:w-auto pl-3 py-1.5 pr-10 border border-red-300 rounded transition-all cursor-pointer hover:bg-red-200 text-red-600"
          >
            Reset Filter
          </p>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0">
          {doctor.length > 0 ? (
            doctor.map((item, index) => (
              <div
                onClick={() => router.push(`/Appointment/${item._id}`)}
                key={index}
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
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">No doctors found for this speciality.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

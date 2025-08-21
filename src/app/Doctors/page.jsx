"use client"
import React, { useEffect, useState } from "react";
import { doctors } from "../../../public/assets/assets_frontend/assets";

import Card from "@/components/commom/Card";

const Page = () => {
  const [filter, setFilter] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loader State

  useEffect(() => {
    setLoading(true); // Start Loading
    setTimeout(() => {
      if (filter) {
        setDoctor(doctors.filter((item) => item.speciality === filter));
      } else {
        setDoctor(doctors);
      }
      setLoading(false); // Stop Loading
    }, 500); // ✅ Smooth delay for UX
  }, [filter]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctor's Speciality.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Sidebar Filters */}
        <div className="md:w-1/4 flex flex-col gap-4 text-sm text-gray-600">
          {["", "General physician", "Gynecologist", "Dermatologist", "Neurologist", "Pediatricians"].map(
            (speciality, index) => (
              <p
                key={index}
                onClick={() => setFilter(speciality)}
                className={`w-[84vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200 ${
                  filter === speciality ? "bg-blue-100 border-blue-500" : ""
                }`}
              >
                {speciality === "" ? "All Doctors" : speciality}
              </p>
            )
          )}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0 relative min-h-[300px] w-full">
          {loading ? (
            <div className="absolute inset-0 flex justify-center items-center">
              {/* ✅ Centered Loader */}
              <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            doctor.map((item) => (
           <Card item={item} key={item._id}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

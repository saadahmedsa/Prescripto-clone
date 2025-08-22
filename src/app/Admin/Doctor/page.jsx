"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/all"); // your API route
        const data = await res.json();
        setDoctors(data.data || []); // assuming { success:true, data:[...] }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p className="p-4">Loading doctors...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="p-4  border rounded-lg shadow bg-white"
            >
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.speciality}</p>
              <p className="text-gray-500">{doctor.degree}</p>
              <p className="text-gray-500">{doctor.experience}</p>
              <p className="text-gray-500">{doctor.fees}</p>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;

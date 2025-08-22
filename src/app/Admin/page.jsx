"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users" ,{  credentials: "include",}); // your patients API
        const data = await res.json();
        console.log(data);
        
        setPatients(data || []); 
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <p className="p-4">Loading patients...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Patients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div
              key={patient.id}
              className="p-4 border rounded-lg shadow bg-white"
            >
              <h2 className="text-lg font-semibold">{patient.firstName}</h2>
              <p className="text-gray-600">Age: {patient.emailAddresses[0].emailAddress}</p>
            </div>
          ))
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;

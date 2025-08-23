"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          credentials: "include",
        });
        const data = await res.json();
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

  // filter logic
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName || ""} ${patient.lastName || ""}`.toLowerCase();
    const email = patient.emailAddresses[0]?.emailAddress?.toLowerCase() || "";
    const id = patient.id?.toLowerCase() || "";

    return (
      fullName.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      id.includes(search.toLowerCase())
    );
  });

  return (
    <div className=" p-4">
     <div className="flex flex-col sm:flex-row sm:items-center  p-4 gap-14">
  {/* Heading */}
  <h1 className="text-xl font-semibold">All Patients</h1>

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search by name, email or ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full sm:w-1/3 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0 relative min-h-[300px] w-full">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6"
            >
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <Image
                  src={patient.imageUrl}
                  alt={patient.firstName || "Patient"}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-blue-500"
                />
                <h2 className="text-xl font-semibold mt-3">
                  {patient.firstName} {patient.lastName || ""}
                </h2>
                <p className="text-gray-500 text-sm">ID: {patient.id}</p>
              </div>

              {/* Patient Details */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Email</span>
                  <span className="text-gray-600">
                    {patient.emailAddresses[0]?.emailAddress || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Phone</span>
                  <span className="text-gray-600">
                    {patient.phoneNumbers[0]?.phoneNumber || "Not Provided"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Created At</span>
                  <span className="text-gray-600">
                    {new Date(patient.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
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

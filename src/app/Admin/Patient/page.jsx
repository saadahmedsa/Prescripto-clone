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
        setPatients(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // filter logic
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName || ""} ${patient.lastName || ""}`.toLowerCase();
    const email = patient?.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";


    return (
      fullName.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) 
  
    );
  });

  return (
    <div className="p-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">All Patients</h1>

        <input
          type="text"
          placeholder="Search by name, email or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500">Loading patients...</p>
      )}

      {/* Patients Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6"
              >
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                  <Image
                    src={patient.imageUrl || "/default-avatar.png"}
                    alt={patient.firstName || "Patient"}
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-blue-500 object-cover"
                  />
                  <h2 className="text-lg font-semibold mt-3 text-gray-800">
                    {patient.firstName} {patient.lastName || ""}
                  </h2>
                  <p className="text-gray-500 text-sm">ID: {patient.id}</p>
                </div>

                {/* Patient Details */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Email</span>
                    <span className="text-gray-600 text-sm text-right">
                      {patient?.emailAddresses?.[0]?.emailAddress || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-700">Phone</span>
                    <span className="text-gray-600 text-sm text-right">
                      {patient?.phoneNumbers?.[0]?.phoneNumber || "Not Provided"}
                    </span>
                  </div>
                 
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No patients found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;

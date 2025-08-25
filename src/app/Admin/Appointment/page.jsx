"use client";

import React, { useEffect, useState } from "react";
import api from "@/helper/api";

const Page = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data: appointmentsData } = await api.get("/allappointment");
        const allAppointments = appointmentsData.data || [];

        setAppointments(allAppointments);
        setFilteredAppointments(allAppointments);

        // extract unique doctor names for filter dropdown
        const uniqueDoctors = [
          ...new Set(allAppointments.map((appt) => appt.doctor?.name).filter(Boolean)),
        ];
        setDoctors(uniqueDoctors);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filtering logic
  useEffect(() => {
    let data = [...appointments];

    // search by patient name / reason
    if (search.trim()) {
      data = data.filter(
        (appt) =>
          appt.name.toLowerCase().includes(search.toLowerCase()) ||
          appt.reason.toLowerCase().includes(search.toLowerCase())
      );
    }

    // filter by status
    if (statusFilter !== "all") {
      data = data.filter((appt) => appt.status === statusFilter);
    }

    // filter by doctor
    if (doctorFilter !== "all") {
      data = data.filter((appt) => appt.doctor?.name === doctorFilter);
    }

    setFilteredAppointments(data);
  }, [search, statusFilter, doctorFilter, appointments]);

  if (loading) {
    return <p className="p-4 text-gray-500">Loading appointments...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">All Appointments</h1>

      {/* 🔎 Search + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by patient or reason..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
        />

        {/* Filters */}
        <div className="flex gap-4">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Doctor Filter */}
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Doctors</option>
            {doctors.map((doc, idx) => (
              <option key={idx} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-5 gap-4 p-4 font-semibold text-gray-700 border-b bg-white rounded-t-lg">
        <p>Patient</p>
        <p>Doctor</p>
        <p>Time</p>
        <p>Reason</p>
        <p>Status</p>
      </div>

      {/* Data rows */}
      {filteredAppointments.length > 0 ? (
        <div className="divide-y">
          {filteredAppointments.map((appt) => (
            <div
              key={appt._id}
              className="grid grid-cols-5 gap-4 p-4 bg-white hover:bg-gray-50 transition"
            >
              <p>{appt.name}</p>
              <p>{appt.doctor?.name || "N/A"}</p>
              <p>{appt.timeSlot}</p>
              <p>{appt.reason}</p>
              <p>
                <span
                  className={`capitalize px-2 py-1 rounded-md text-sm ${
                    appt.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appt.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No appointments found.</p>
      )}
    </div>
  );
};

export default Page;

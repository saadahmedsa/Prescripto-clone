"use client";
import { CalendarCheck, User,CalendarClock,Check, X ,Stethoscope, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    todayAppointments: 0,
  });
   const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch doctors
        const doctorRes = await fetch("http://localhost:5000/api/all", { credentials: "include" });
        const doctorsData = await doctorRes.json();

        // Fetch patients
        const patientRes = await fetch("http://localhost:5000/api/users", { credentials: "include" });
        const patientsData = await patientRes.json();

        // Fetch appointments
        const appointmentRes = await fetch("http://localhost:5000/api/appointments/today", { credentials: "include" });
        const appointmentsData = await appointmentRes.json();
        setAppointments(appointmentsData.data.filter((a) => a.status === "pending")); 

       
        

        // Set stats
        setStats({
          doctors: doctorsData.data.length || 0,
          patients: patientsData.length || 0,
          todayAppointments: appointmentsData.data.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4">

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Doctors */}
         <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-green-600 font-semibold">Appointments</h2>
            <CalendarCheck className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.todayAppointments}
          </p>
        </div>

        {/* Patients */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-purple-600 font-semibold">Total Patients</h2>
            <User2 className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.patients}
          </p>
        </div>

        {/* Doctors */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-blue-600 font-semibold">Total Doctors</h2>
            <Stethoscope className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.doctors}
          </p>
        </div>
</div>
      
<div className="grid grid-cols-1  lg:grid-cols-4 gap-6"> 
      {appointments.length > 0 ? (
        <div className=" lg:col-span-3 flex flex-col bg-white rounded-lg p-4 gap-2 my-4">
        <h1 className="text-xl font-semibold mb-4">Pending Appointments</h1>     
             {appointments.map((appt) => (

            <div
              key={appt._id}
              className="p-4 border rounded-xl shadow-sm hover:bg-gray-50 transition"
            >
              {/* Left Info */}
              <div className="flex justify-between items-center gap-1">
                <p className="flex items-center gap-2 text-gray-800 font-medium">
                  <User size={16} className="text-gray-500" /> {appt.name}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Stethoscope size={16} className="text-gray-400" />{" "}
                  {appt.doctor?.name}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarClock size={16} className="text-gray-400" />{" "}
                  {appt.timeSlot}
                </p>
                <p className="text-sm text-gray-500">{appt.reason}</p>


              {/* Right Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(appt._id, "approved")}
                  className="flex items-center gap-1 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                >
                  <Check size={20} /> 
                </button>
                <button
                  onClick={() => handleAction(appt._id, "rejected")}
                  className="flex items-center gap-1 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <X size={20} /> 
                </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="lg:cols-span-3 text-gray-500 text-center py-6">
          🎉 No pending appointments today.
        </p>
      )}
  </div>
    </div>

  );
};

export default DashboardPage;

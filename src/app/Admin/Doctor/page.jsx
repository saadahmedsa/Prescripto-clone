"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    speciality: "",
    degree: "",
    experience: "",
    fees: "",
    address: "",
    about: "",
    image: "",
  });

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/all");
        const data = await res.json();
        setDoctors(data.data || []);
        setFilteredDoctors(data.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Filter & search
  useEffect(() => {
    let filtered = [...doctors];
    if (search) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (specialityFilter) {
      filtered = filtered.filter(
        (d) => d.speciality.toLowerCase() === specialityFilter.toLowerCase()
      );
    }
    setFilteredDoctors(filtered);
  }, [search, specialityFilter, doctors]);

  // Add doctor handler
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/add-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor),
      });
      const data = await res.json();
      if (data.success) {
        setDoctors((prev) => [...prev, data.doctor]);
        setShowAddModal(false);
        setNewDoctor({
          name: "",
          speciality: "",
          degree: "",
          experience: "",
          fees: "",
          address: "",
          about: "",
          image: "",
        });
      }
    } catch (err) {
      console.error("Failed to add doctor:", err);
    }
  };

  if (loading) return <p className="p-4">Loading doctors...</p>;

  return (
    <div className="p-6">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Doctors</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-1"
          />
          <select
            value={specialityFilter}
            onChange={(e) => setSpecialityFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="">All Specialities</option>
            {[...new Set(doctors.map((d) => d.speciality))].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition"
            >
              {doctor.image && (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
              )}
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.speciality}</p>
              <p className="text-gray-500">{doctor.degree}</p>
              <p className="text-gray-500">{doctor.experience} years experience</p>
              <p className="text-gray-500">Fees: ${doctor.fees}</p>
              <p className="text-gray-500">Address: {doctor.address}</p>
              <p className="text-gray-500">{doctor.about}</p>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Doctor</h2>
            <form onSubmit={handleAddDoctor} className="flex flex-col gap-3">
              {["name","speciality","degree","experience","fees","address","about","image"].map((field) => (
                <input
                  key={field}
                  type={field==="fees"||field==="experience" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newDoctor[field]}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, [field]: e.target.value })
                  }
                  required={field!=="image"} // image optional
                  className="border rounded px-3 py-1"
                />
              ))}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

"use client";
import Card from "@/components/commom/Admincard";
import { Button } from "@/components/ui/button";
import api from "@/helper/api";
import { CloudUpload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
        const res = await api.get("/all");
        setDoctors(res.data.data || []);
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
      const res = await api.post("/add", newDoctor);
    
      if (res.data.success) {
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
        toast.success("Doctor added successfully")
      }else{
        toast.failed(res.data.message || "Doctor added Failed ")

      }
    } catch (err) {
      console.error("Failed to add doctor:", err);
    }
  };
  console.log(filteredDoctors);
  

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
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add Doctor
          </Button>
        </div>
      </div>

      {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0 relative min-h-[300px] w-full">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
           <Card item={doctor} key={doctor._id}/>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>

{showAddModal && (
<div className="fixed inset-0 bg-black/40 z-50 flex transition-opacity duration-300 ease-out">
    {/* Click backdrop to close */}
    <div
      className="flex-1"
      onClick={() => setShowAddModal(false)}
    />

    {/* Slide-over panel */}
     <div
      className={`bg-white overflow-y-auto w-full max-w-md shadow-xl p-6 transform 
      transition-all duration-300 ease-out
      ${showAddModal ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Add Doctor</h2>
        <button
          onClick={() => setShowAddModal(false)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleAddDoctor} className="flex flex-col gap-4">
        {/* Image Upload Box */}
        <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
          {newDoctor.image ? (
            <img
              src={URL.createObjectURL(newDoctor.image)}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-full mb-2"
            />
          ) : (
            <>
              <CloudUpload size={40} className="text-blue-600 mb-2" />
              <span className="text-gray-600">Upload Image</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, image: e.target.files[0] })
            }
            className="hidden"
          />
        </label>

        {/* Other fields */}
        {["name", "speciality", "degree", "experience", "fees", "address", "about"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              {/* {field.charAt(0).toUpperCase() + field.slice(1)} */}
            </label>
            
                  {field === "speciality" ? (
                    <select
                      value={newDoctor.speciality}
                      onChange={(e) =>
                        setNewDoctor({ ...newDoctor, speciality: e.target.value })
                      }
                      required
                      className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="">Select Speciality</option>
                      <option value="Cardiologist">Gynecologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Orthopedic">Pediatricians</option>
                      <option value="General Physician">General Physician</option>
                    </select>
                  ) : (
                    <input
                      type={field === "fees" ? "number" : "text"}
                      value={newDoctor[field]}
                      onChange={(e) =>
                        setNewDoctor({ ...newDoctor, [field]: e.target.value })
                      }
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      required
                      className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  )}
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

"use client";
import React, { useState } from "react";
import axios from "axios";

const AddDoctorSheet = ({ isOpen, onClose, onAdded }) => {
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
  const [uploading, setUploading] = useState(false);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Cloudinary preset

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        formData
      );
      setNewDoctor({ ...newDoctor, image: res.data.secure_url });
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // Submit new doctor
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
        onAdded(data.doctor);
        onClose();
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl w-full max-w-md p-6 transform transition-transform duration-300 translate-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Add Doctor</h2>
        <form onSubmit={handleAddDoctor} className="flex flex-col gap-3">
          {[
            "name",
            "speciality",
            "degree",
            "experience",
            "fees",
            "address",
            "about",
          ].map((field) => (
            <input
              key={field}
              type={field === "fees" || field === "experience" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newDoctor[field]}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, [field]: e.target.value })
              }
              required
              className="border rounded px-3 py-1"
            />
          ))}

          {/* Image upload */}
          <div>
            <input type="file" onChange={handleImageUpload} />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
            {newDoctor.image && (
              <img
                src={newDoctor.image}
                alt="Doctor"
                className="w-24 h-24 object-cover rounded mt-2"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={uploading}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorSheet;

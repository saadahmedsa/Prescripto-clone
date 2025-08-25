"use client"

import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'

const Card = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    // Store all fields in one object
    const [editedData, setEditedData] = useState({
        name: item.name,
        speciality: item.speciality,
        experience: item.experience,
        degree: item.degree,
        fees: item.fees,
        address: item.address,
        about: item.about,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditedData((prev) => ({ ...prev, [name]: value }))
    }

    const handleEdit = () => setIsEditing(true)

    const handleSave = () => {
        // Call API to save changes
        console.log("Saving data:", editedData)
        setIsEditing(false)
        setIsModalOpen(false)
    }

    const handleDelete = () => {
        // Call API to delete the item
        console.log("Deleting:", item._id)
        setIsModalOpen(false)
    }

    return (
        <>
            {/* Card Preview */}
            <div
                onClick={() => setIsModalOpen(true)}
                className="border border-blue-200 rounded-xl cursor-pointer hover:translate-y-[-5px] transition-transform duration-300 shadow-md"
            >
                <Image
                    className="bg-blue-50 w-full h-auto rounded-t-xl"
                    src={item.image}
                    width={300}
                    height={300}
                    alt={item.name}
                />
                <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-green-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <p>Available</p>
                    </div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">{item.speciality}</p>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6 pt-10 relative">
                       <button
  className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 text-gray-600 rounded-full shadow-lg transition"
  onClick={() => setIsModalOpen(false)}
>
  <X size={22} strokeWidth={2.5} />
</button>
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Image */}
                            <div className="flex-shrink-0 pt-5">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={200}
                                    height={200}
                                    className="rounded-lg object-cover bg-blue-50"
                                />
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 pt-5">
                                {isEditing ? (
                                    <div className="flex flex-col gap-3">
                                        <input
                                            className="border p-2 rounded"
                                            name="name"
                                            value={editedData.name}
                                            onChange={handleChange}
                                            placeholder="Name"
                                        />
                                        <input
                                            className="border p-2 rounded"
                                            name="speciality"
                                            value={editedData.speciality}
                                            onChange={handleChange}
                                            placeholder="Speciality"
                                        />
                                        <input
                                            className="border p-2 rounded"
                                            name="experience"
                                            value={editedData.experience}
                                            onChange={handleChange}
                                            placeholder="Experience"
                                        />
                                        <input
                                            className="border p-2 rounded"
                                            name="degree"
                                            value={editedData.degree}
                                            onChange={handleChange}
                                            placeholder="Degree"
                                        />
                                        <input
                                            className="border p-2 rounded"
                                            name="fees"
                                            value={editedData.fees}
                                            onChange={handleChange}
                                            placeholder="Fees"
                                        />
                                        <input
                                            className="border p-2 rounded"
                                            name="address"
                                            value={editedData.address}
                                            onChange={handleChange}
                                            placeholder="Address"
                                        />
                                        <textarea
                                            className="border p-2 rounded"
                                            name="about"
                                            value={editedData.about}
                                            onChange={handleChange}
                                            placeholder="About"
                                            rows={3}
                                        />
                                        <div className="flex gap-3">
                                            <Button
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                onClick={handleSave}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-lg">{editedData.name}</p>
                                        <p className="text-gray-600">{editedData.speciality}</p>
                                        <p className="text-gray-600">Experience: {editedData.experience}</p>
                                        <p className="text-gray-600">Degree: {editedData.degree}</p>
                                        <p className="text-gray-600">Fees: {editedData.fees}</p>
                                        <p className="text-gray-600">Address: {editedData.address}</p>
                                        <p className="text-gray-600">About: {editedData.about}</p>
                                        <div className="flex justify-end gap-3 mt-4">
                                            <Button
                                                className="bg-blue-700 text-white px-4 py-2 rounded"
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Card

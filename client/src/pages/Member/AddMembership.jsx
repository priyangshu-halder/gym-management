import React, { useState } from 'react'
import axios from 'axios'

const AddMembership = ({ open, onClose, onMemberAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  })

  if (!open) return null

  // Handle input change
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')

      const response = await axios.post(
        'http://localhost:8000/api/v1/profile',
        {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          tag: 'member',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(response.data)
      alert('Membership Added Successfully')

      // Clear the form
      setFormData({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
      })

      // Close the modal
      onClose()

      // Tell the dashboard parent component to refresh
      if (onMemberAdded) {
        onMemberAdded()
      }
    } catch (error) {
      console.log(error.response?.data)
      alert('Failed to add membership')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Add Membership</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Membership Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Member Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
          >
            Add Membership
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddMembership

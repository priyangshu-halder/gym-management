import React, { useState } from 'react'
import axios from 'axios'

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullname: '',
    phoneNumber: '',
    ownerName: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async () => {
    console.log(formData)

    try {
      setLoading(true)

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData)

      console.log(response.data)

      alert(response.data.message)

      switchToLogin()
    } catch (error) {
      console.log(error.response?.data)

      alert(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Register Your Gym</h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/20 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/20 text-white"
        />

        <input
          type="text"
          name="fullname"
          placeholder="Gym Name"
          value={formData.fullname}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/20 text-white"
        />

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/20 text-white"
        />

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/20 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/20 text-white"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="mt-4 bg-amber-400 text-black font-semibold py-3 rounded-lg"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-gray-300 text-sm text-center mt-2">
          Already have an account?{' '}
          <span onClick={switchToLogin} className="text-amber-400 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register

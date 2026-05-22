import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({ switchToRegister, switchToForgotPassword }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async () => {
    try {
      setLoading(true)

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData)

      console.log(response.data)

      // Save token
      localStorage.setItem('token', response.data.data.accessToken)

      // Save gym data if needed
      localStorage.setItem('gym', JSON.stringify(response.data.data.gym))

      // Login session
      sessionStorage.setItem('isLogin', true)

      alert('Login Successful')

      navigate('/dashboard')
    } catch (error) {
      console.log(error)

      alert(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-7 text-center">Welcome Back</h2>

      <div className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-amber-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-amber-400"
        />

        <span
          onClick={switchToForgotPassword}
          className="text-amber-300 cursor-pointer hover:underline"
        >
          Forgot Password?
        </span>

        <button
          className="mt-4 bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-300 transition duration-300"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-gray-300 text-sm text-center mt-2">
          Not registered?{' '}
          <span
            onClick={switchToRegister}
            className="text-amber-400 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login

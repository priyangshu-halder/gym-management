import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Reusable Card Component
const StatCard = ({ title, value, emoji, gradient, to }) => (
  <Link
    to={to}
    className={`relative overflow-hidden rounded-3xl p-7 text-white shadow-xl ${gradient}`}
  >
    <div className="absolute top-4 right-5 text-8xl opacity-20">{emoji}</div>

    <div className="relative z-10">
      <h2 className="text-6xl font-extrabold drop-shadow">{value}</h2>

      <p className="mt-2 text-lg font-semibold uppercase tracking-widest">{title}</p>

      <div className="mt-10 pt-4 border-t border-white/30 flex justify-between items-center">
        <span className="font-medium">View All</span>
        <span className="text-2xl">→</span>
      </div>
    </div>
  </Link>
)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    inactiveMembers: 0,
    memberships: 0,
    revenue: 0,
    pendingPayments: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')

      // Example API calls
      const profileRes = await axios.get('http://localhost:8000/api/v1/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const membershipRes = await axios.get('http://localhost:8000/api/v1/memberships', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const paymentRes = await axios.get('http://localhost:8000/api/v1/payments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const users = profileRes.data.data
      const memberships = membershipRes.data.data
      const payments = paymentRes.data.data

      // Calculations
      const totalMembers = users.length

      const activeMembers = users.filter(user => user.status === 'active').length

      const inactiveMembers = users.filter(user => user.status === 'inactive').length

      const pendingPayments = payments
        .filter(payment => payment.status === 'pending')
        .reduce((sum, payment) => sum + payment.finalAmount, 0)

      const revenue = payments
        .filter(payment => payment.status === 'paid')
        .reduce((sum, payment) => sum + payment.finalAmount, 0)

      setStats({
        totalMembers,
        activeMembers,
        inactiveMembers,
        memberships: memberships.length,
        revenue,
        pendingPayments,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Members"
        value={stats.totalMembers}
        emoji="👥"
        gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-700"
      />

      <StatCard
        title="Active Members"
        value={stats.activeMembers}
        emoji="📅"
        gradient="bg-gradient-to-br from-green-500 via-green-600 to-green-700"
      />

      <StatCard
        title="Inactive Members"
        value={stats.inactiveMembers}
        emoji="⚠️"
        gradient="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700"
      />

      <StatCard
        title="Packages Types"
        value={stats.memberships}
        emoji="💤"
        gradient="bg-gradient-to-br from-violet-500 via-violet-600 to-cyan-700"
      />

      <StatCard
        title="Monthly Revenue"
        value={`₹${stats.revenue}`}
        emoji="💰"
        gradient="bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700"
      />

      <StatCard
        title="Pending Payments"
        value={`₹${stats.pendingPayments}`}
        emoji="💳"
        gradient="bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700"
      />
    </div>
  )
}

export default Dashboard

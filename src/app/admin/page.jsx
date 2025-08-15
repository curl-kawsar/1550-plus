"use client"

import { useState, useEffect } from 'react'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminNavbar from '@/components/admin/AdminNavbar'
import DashboardStats from '@/components/admin/DashboardStats'
import StudentTable from '@/components/admin/StudentTable'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [admin, setAdmin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/me')
      if (response.ok) {
        const data = await response.json()
        setAdmin(data.admin)
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginSuccess = (adminData) => {
    setAdmin(adminData)
  }

  const handleLogout = () => {
    setAdmin(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!admin) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        admin={admin}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="mt-2 text-gray-600">
                Monitor student registrations and track engagement metrics.
              </p>
            </div>
            <DashboardStats />
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Student Management</h2>
              <p className="mt-2 text-gray-600">
                View and manage all student registrations.
              </p>
            </div>
            <StudentTable />
          </div>
        )}
      </div>
    </div>
  )
}
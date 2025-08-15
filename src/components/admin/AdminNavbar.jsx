"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Users, Settings, LogOut, Shield } from "lucide-react"
import { toast } from "sonner"

const AdminNavbar = ({ activeTab, setActiveTab, admin, onLogout }) => {
  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
  ]

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST'
      })

      if (response.ok) {
        toast.success("Logged out successfully")
        onLogout()
      } else {
        toast.error("Logout failed")
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error("An error occurred during logout")
    }
  }

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center">
                <img 
                  src="/navbar-logo.png" 
                  alt="College Mastermind Logo" 
                  className="w-22 h-12"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{admin?.name}</p>
                <p className="text-xs text-gray-500">{admin?.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === item.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

export default AdminNavbar
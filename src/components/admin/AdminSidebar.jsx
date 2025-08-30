"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Users, MessageCircle, Calendar, ClipboardCheck, Wrench, LogOut, Menu, X } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

const AdminSidebar = ({ activeTab, setActiveTab, admin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'contacts', label: 'Contact Messages', icon: MessageCircle },
    { id: 'enrollment', label: 'Class Enrollment', icon: Calendar },
    { id: 'diagnostic', label: 'Diagnostic Tests', icon: ClipboardCheck },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (tabId) => {
    setActiveTab(tabId)
    setIsMobileMenuOpen(false) // Close mobile menu when selecting an item
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobileMenu}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo and Admin Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="/logo.png" 
              alt="1550+ Logo" 
              className="w-12 h-12"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {admin?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {admin?.email || 'admin@1550plus.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
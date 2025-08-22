"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-700/20" style={{ backgroundColor: '#141C42' }}>
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="1550+ Logo" 
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/" ? "text-white" : "text-gray-300"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/about" ? "text-white" : "text-gray-300"
              }`}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/services" ? "text-white" : "text-gray-300"
              }`}
            >
              Services
            </Link>
            <Link 
              href="/events" 
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/events" ? "text-white" : "text-gray-300"
              }`}
            >
              Events
            </Link>
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/register">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              Sign up
            </Button>
          </Link>
          <Link href="/admin">
            <Button 
              className="login-gradient-btn text-white px-6 hover:scale-105 transition-all duration-200"
            >
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-700/20" style={{ backgroundColor: '#141C42' }}>
          <div className="px-4 py-4 space-y-4">
            <Link 
              href="/" 
              className={`block text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/" ? "text-white" : "text-gray-300"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`block text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/about" ? "text-white" : "text-gray-300"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className={`block text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/services" ? "text-white" : "text-gray-300"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/events" 
              className={`block text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === "/events" ? "text-white" : "text-gray-300"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </Link>
            <div className="pt-4 border-t border-gray-700/20 space-y-3">
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-300 hover:text-white hover:bg-white/10 justify-start"
                >
                  Sign up
                </Button>
              </Link>
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  className="login-gradient-btn w-full text-white hover:scale-105 transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

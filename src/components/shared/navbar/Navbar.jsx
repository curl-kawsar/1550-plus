"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">N</span>
          </div>
          <span className="text-xl font-semibold">NextBoiler</span>
        </div>

        <div className="flex items-center justify-center flex-1 px-8">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/register" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/register" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Register
            </Link>
            <Link 
              href="/admin" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {pathname !== "/login" && pathname !== "/register" && (
            <>
              <Link href="/login">
                <Button variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button>
                  Student Registration
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

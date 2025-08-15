"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Calendar } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Student Information
    firstName: "",
    lastName: "",
    email: "",
    graduationYear: "",
    highSchoolName: "",
    phoneNumber: "",
    gender: "Male",
    
    // Parent Information
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhoneNumber: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    
    // Academic Information
    currentGPA: "",
    classRigor: "Mostly Honors and AP",
    universitiesWant: "Ivy League/Top 20",
    
    // Academic Information Part 2
    satActScores: "",
    biggestStressor: "",
    parentWorry: "",
    registrationCode: ""
  })

  const totalSteps = 4

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateStep = () => {
    const errors = []
    
    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) errors.push("First name is required")
        if (!formData.lastName.trim()) errors.push("Last name is required")
        if (!formData.email.trim()) errors.push("Email is required")
        if (!formData.email.includes('@')) errors.push("Valid email is required")
        if (!formData.graduationYear) errors.push("Graduation year is required")
        if (!formData.highSchoolName.trim()) errors.push("High school name is required")
        if (!formData.phoneNumber.trim()) errors.push("Phone number is required")
        break
        
      case 2:
        if (!formData.parentFirstName.trim()) errors.push("Parent first name is required")
        if (!formData.parentLastName.trim()) errors.push("Parent last name is required")
        if (!formData.parentEmail.trim()) errors.push("Parent email is required")
        if (!formData.parentEmail.includes('@')) errors.push("Valid parent email is required")
        if (!formData.parentPhoneNumber.trim()) errors.push("Parent phone number is required")
        if (!formData.address.trim()) errors.push("Address is required")
        if (!formData.zipCode.trim()) errors.push("Zip code is required")
        if (!formData.city.trim()) errors.push("City is required")
        if (!formData.state.trim()) errors.push("State is required")
        break
        
      case 3:
        if (!formData.currentGPA) errors.push("GPA is required")
        if (formData.currentGPA && (parseFloat(formData.currentGPA) < 0 || parseFloat(formData.currentGPA) > 4)) {
          errors.push("GPA must be between 0.0 and 4.0")
        }
        break
        
      case 4:
        if (!formData.biggestStressor.trim()) errors.push("Biggest stressor is required")
        if (!formData.parentWorry.trim()) errors.push("Parent worry is required")
        if (!formData.registrationCode.trim()) errors.push("Registration code is required")
        break
    }
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return false
    }
    
    return true
  }

  const handleNext = () => {
    if (validateStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    
    setIsLoading(true)
    try {
      // Additional validation
      const graduationDate = new Date(formData.graduationYear)
      const currentYear = new Date().getFullYear()
      
      if (graduationDate.getFullYear() < currentYear - 10 || graduationDate.getFullYear() > currentYear + 10) {
        toast.error("Please enter a valid graduation year")
        setIsLoading(false)
        return
      }
      
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          graduationYear: graduationDate,
          currentGPA: parseFloat(formData.currentGPA)
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Registration submitted successfully! Thank you for joining College Mastermind.")
        // Reset form
        setFormData({
          firstName: "", lastName: "", email: "", graduationYear: "",
          highSchoolName: "", phoneNumber: "", gender: "Male",
          parentFirstName: "", parentLastName: "", parentEmail: "",
          parentPhoneNumber: "", address: "", zipCode: "", city: "", state: "",
          currentGPA: "", classRigor: "Mostly Honors and AP", 
          universitiesWant: "Ivy League/Top 20", satActScores: "",
          biggestStressor: "", parentWorry: "", registrationCode: ""
        })
        setCurrentStep(1)
      } else {
        toast.error(data.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error("An error occurred. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="border-[#457BF5]"
                  />
                  <Input
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="border-[#457BF5]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <Input
                  type="email"
                  placeholder="collegemastermind@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-2 border-[#457BF5]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Graduation Year</Label>
                <div className="relative mt-2">
                  <Input
                    type="date"
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    className="border-[#457BF5]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">High School Name</Label>
                <Input
                  placeholder="XYZ High School"
                  value={formData.highSchoolName}
                  onChange={(e) => handleInputChange('highSchoolName', e.target.value)}
                  className="mt-2 border-[#457BF5]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="relative mt-2">
                  <Input
                    placeholder="XXXXXXXXXXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="border-[#457BF5] pl-12"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-500">🇺🇸</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Gender</Label>
                <div className="flex space-x-6 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Parent Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Input
                    placeholder="First Name"
                    value={formData.parentFirstName}
                    onChange={(e) => handleInputChange('parentFirstName', e.target.value)}
                    className="border-[#457BF5]"
                  />
                  <Input
                    placeholder="Last Name"
                    value={formData.parentLastName}
                    onChange={(e) => handleInputChange('parentLastName', e.target.value)}
                    className="border-[#457BF5]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <Input
                  type="email"
                  placeholder="collegemastermind@gmail.com"
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  className="mt-2 border-[#457BF5]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="relative mt-2">
                  <Input
                    placeholder="XXXXXXXXXXXX"
                    value={formData.parentPhoneNumber}
                    onChange={(e) => handleInputChange('parentPhoneNumber', e.target.value)}
                    className="border-[#457BF5] pl-12"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-500">🇺🇸</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Address</Label>
                  <Input
                    placeholder="10 street"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2 border-[#457BF5]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Zip Code</Label>
                  <Input
                    placeholder="2505"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="mt-2 border-[#457BF5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">City</Label>
                  <Input
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-2 border-[#457BF5]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">State</Label>
                  <Input
                    placeholder="New York"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="mt-2 border-[#457BF5]"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Current Unweighted GPA</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  placeholder="3.84"
                  value={formData.currentGPA}
                  onChange={(e) => handleInputChange('currentGPA', e.target.value)}
                  className="mt-2 border-[#457BF5]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Class Rigor</Label>
                <div className="space-y-3 mt-2">
                  {["Mostly Honors and AP", "Some Honors and AP", "No Honors or AP"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="classRigor"
                        value={option}
                        checked={formData.classRigor === option}
                        onChange={(e) => handleInputChange('classRigor', e.target.value)}
                        className="mr-3"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Universities You Want</Label>
                <div className="space-y-3 mt-2">
                  {[
                    "Ivy League/Top 20",
                    "Top 50", 
                    "Top 100",
                    "Selective State University",
                    "Anywhere I can"
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="universitiesWant"
                        value={option}
                        checked={formData.universitiesWant === option}
                        onChange={(e) => handleInputChange('universitiesWant', e.target.value)}
                        className="mr-3"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  If You Have Taken The SAT Or ACT Before, List Your Scores If You Know Them
                </Label>
                <textarea
                  placeholder="Your answer"
                  value={formData.satActScores}
                  onChange={(e) => handleInputChange('satActScores', e.target.value)}
                  className="mt-2 w-full p-3 border border-[#457BF5] rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#457BF5] focus:border-[#457BF5]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  What Is Your Biggest Stressor About The College Admissions Process?
                </Label>
                <textarea
                  placeholder="Your answer"
                  value={formData.biggestStressor}
                  onChange={(e) => handleInputChange('biggestStressor', e.target.value)}
                  className="mt-2 w-full p-3 border border-[#457BF5] rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#457BF5] focus:border-[#457BF5]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  What Is Your Parent(S) Biggest Worry Or What Do They Talk About A Lot?
                </Label>
                <textarea
                  placeholder="Your answer"
                  value={formData.parentWorry}
                  onChange={(e) => handleInputChange('parentWorry', e.target.value)}
                  className="mt-2 w-full p-3 border border-[#457BF5] rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#457BF5] focus:border-[#457BF5]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Registration Code</Label>
                <Input
                  placeholder="Your answer"
                  value={formData.registrationCode}
                  onChange={(e) => handleInputChange('registrationCode', e.target.value)}
                  className="mt-2 border-[#457BF5]"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getProgressPercentage = () => {
    return (currentStep / totalSteps) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="w-1/2 p-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <img 
                src="/navbar-logo.png" 
                alt="College Mastermind Logo" 
                className="w-22 h-16"
              />
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">Steps</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <Card className="border-0 shadow-none p-0">
            <CardContent className="p-0">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    className="px-6"
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    onClick={handleNext}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 px-6"
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 px-6"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/std_reg.png" 
            alt="Student Registration" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
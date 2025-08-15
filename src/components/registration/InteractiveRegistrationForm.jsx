"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertCircle, Zap, Star } from "lucide-react"
import { useSubmitRegistration, validateStep, getStepProgress } from "@/hooks/useRegistration"
import { toast } from "sonner"

const InteractiveRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [fieldErrors, setFieldErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [formData, setFormData] = useState({
    // Student Information
    firstName: "", lastName: "", email: "", graduationYear: "",
    highSchoolName: "", phoneNumber: "", gender: "Male",
    
    // Parent Information
    parentFirstName: "", parentLastName: "", parentEmail: "",
    parentPhoneNumber: "", address: "", zipCode: "", city: "", state: "",
    
    // Academic Information
    currentGPA: "", classRigor: "Mostly Honors and AP", universitiesWant: "Ivy League/Top 20",
    
    // Academic Information Part 2
    satActScores: "", biggestStressor: "", parentWorry: "", registrationCode: ""
  })

  const submitMutation = useSubmitRegistration()
  const totalSteps = 4

  // Real-time validation
  useEffect(() => {
    const errors = validateStep(currentStep, formData)
    const stepErrors = {}
    
    errors.forEach(error => {
      const field = error.toLowerCase().includes('first name') ? 'firstName' :
                   error.toLowerCase().includes('last name') ? 'lastName' :
                   error.toLowerCase().includes('email') ? (error.includes('parent') ? 'parentEmail' : 'email') :
                   error.toLowerCase().includes('graduation') ? 'graduationYear' :
                   error.toLowerCase().includes('high school') ? 'highSchoolName' :
                   error.toLowerCase().includes('phone') ? (error.includes('parent') ? 'parentPhoneNumber' : 'phoneNumber') :
                   error.toLowerCase().includes('gpa') ? 'currentGPA' :
                   error.toLowerCase().includes('stressor') ? 'biggestStressor' :
                   error.toLowerCase().includes('parent worry') ? 'parentWorry' :
                   error.toLowerCase().includes('registration code') ? 'registrationCode' :
                   error.toLowerCase().includes('address') ? 'address' :
                   error.toLowerCase().includes('zip') ? 'zipCode' :
                   error.toLowerCase().includes('city') ? 'city' :
                   error.toLowerCase().includes('state') ? 'state' : null
      
      if (field) stepErrors[field] = error
    })
    
    setFieldErrors(stepErrors)
  }, [formData, currentStep])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setTouchedFields(prev => ({ ...prev, [field]: true }))
  }

  const handleNext = () => {
    const errors = validateStep(currentStep, formData)
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      toast.success(`Step ${currentStep} completed! 🎉`)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const errors = validateStep(currentStep, formData)
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }

    // Additional graduation year validation
    const graduationDate = new Date(formData.graduationYear)
    const currentYear = new Date().getFullYear()
    
    if (graduationDate.getFullYear() < currentYear - 10 || graduationDate.getFullYear() > currentYear + 10) {
      toast.error("Please enter a valid graduation year")
      return
    }

    submitMutation.mutate(formData, {
      onSuccess: () => {
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
        setTouchedFields({})
        setFieldErrors({})
      }
    })
  }

  const getFieldStatus = (field) => {
    if (fieldErrors[field] && touchedFields[field]) return 'error'
    if (formData[field] && !fieldErrors[field]) return 'success'
    return 'default'
  }

  const getFieldIcon = (field) => {
    const status = getFieldStatus(field)
    if (status === 'success') return <CheckCircle2 className="w-4 h-4 text-green-500" />
    if (status === 'error') return <AlertCircle className="w-4 h-4 text-red-500" />
    return null
  }

  const stepProgress = getStepProgress(currentStep, formData)
  const overallProgress = (currentStep - 1) * 25 + (stepProgress * 0.25)

  const renderInputField = (field, placeholder, type = "text", required = true) => (
    <div className="relative">
      <Input
        type={type}
        placeholder={placeholder}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`border-[#457BF5] pr-10 transition-all duration-200 ${
          getFieldStatus(field) === 'error' ? 'border-red-500 bg-red-50' :
          getFieldStatus(field) === 'success' ? 'border-green-500 bg-green-50' : ''
        }`}
        required={required}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {getFieldIcon(field)}
      </div>
      {fieldErrors[field] && touchedFields[field] && (
        <p className="text-xs text-red-500 mt-1">{fieldErrors[field]}</p>
      )}
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
              <Badge variant="outline" className="ml-auto">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Step Progress</span>
                <span>{stepProgress}% Complete</span>
              </div>
              <Progress value={stepProgress} className="h-2" />
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Full Name *</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {renderInputField('firstName', 'First Name')}
                  {renderInputField('lastName', 'Last Name')}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Email *</Label>
                <div className="mt-2">
                  {renderInputField('email', 'collegemastermind@gmail.com', 'email')}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Graduation Year *</Label>
                <div className="mt-2">
                  {renderInputField('graduationYear', '', 'date')}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">High School Name *</Label>
                <div className="mt-2">
                  {renderInputField('highSchoolName', 'XYZ High School')}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Phone Number *</Label>
                <div className="relative mt-2">
                  <div className="relative">
                    {renderInputField('phoneNumber', 'XXXXXXXXXXXX', 'tel')}
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <span className="text-gray-500">🇺🇸</span>
                    </div>
                    <style jsx>{`
                      input[type="tel"] {
                        padding-left: 3rem;
                      }
                    `}</style>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Gender *</Label>
                <div className="flex space-x-6 mt-2">
                  {['Male', 'Female'].map(option => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2 text-blue-600"
                      />
                      <span className={formData.gender === option ? 'text-blue-600 font-medium' : ''}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Parent Information</h2>
              <Badge variant="outline" className="ml-auto">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Step Progress</span>
                <span>{stepProgress}% Complete</span>
              </div>
              <Progress value={stepProgress} className="h-2" />
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Parent Full Name *</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {renderInputField('parentFirstName', 'First Name')}
                  {renderInputField('parentLastName', 'Last Name')}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Parent Email *</Label>
                <div className="mt-2">
                  {renderInputField('parentEmail', 'parent@email.com', 'email')}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Parent Phone Number *</Label>
                <div className="relative mt-2">
                  <div className="relative">
                    {renderInputField('parentPhoneNumber', 'XXXXXXXXXXXX', 'tel')}
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <span className="text-gray-500">🇺🇸</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Address *</Label>
                  <div className="mt-2">
                    {renderInputField('address', '10 street')}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Zip Code *</Label>
                  <div className="mt-2">
                    {renderInputField('zipCode', '2505')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">City *</Label>
                  <div className="mt-2">
                    {renderInputField('city', 'New York')}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">State *</Label>
                  <div className="mt-2">
                    {renderInputField('state', 'New York')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
              <Badge variant="outline" className="ml-auto">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Step Progress</span>
                <span>{stepProgress}% Complete</span>
              </div>
              <Progress value={stepProgress} className="h-2" />
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Current Unweighted GPA *</Label>
                <div className="mt-2">
                  {renderInputField('currentGPA', '3.84', 'number')}
                  <p className="text-xs text-gray-500 mt-1">Enter your GPA on a 4.0 scale</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Class Rigor *</Label>
                <div className="space-y-3 mt-2">
                  {["Mostly Honors and AP", "Some Honors and AP", "No Honors or AP"].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="classRigor"
                        value={option}
                        checked={formData.classRigor === option}
                        onChange={(e) => handleInputChange('classRigor', e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className={formData.classRigor === option ? 'text-blue-600 font-medium' : ''}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Universities You Want *</Label>
                <div className="space-y-3 mt-2">
                  {[
                    "Ivy League/Top 20",
                    "Top 50", 
                    "Top 100",
                    "Selective State University",
                    "Anywhere I can"
                  ].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="universitiesWant"
                        value={option}
                        checked={formData.universitiesWant === option}
                        onChange={(e) => handleInputChange('universitiesWant', e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className={formData.universitiesWant === option ? 'text-blue-600 font-medium' : ''}>
                        {option}
                      </span>
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
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Final Questions</h2>
              <Badge variant="outline" className="ml-auto">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Step Progress</span>
                <span>{stepProgress}% Complete</span>
              </div>
              <Progress value={stepProgress} className="h-2" />
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  SAT/ACT Scores (Optional)
                </Label>
                <textarea
                  placeholder="If you have taken the SAT or ACT, please list your scores..."
                  value={formData.satActScores}
                  onChange={(e) => handleInputChange('satActScores', e.target.value)}
                  className="mt-2 w-full p-3 border border-[#457BF5] rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#457BF5] focus:border-[#457BF5]"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Biggest Stressor About College Admissions *
                </Label>
                <div className="relative">
                  <textarea
                    placeholder="What worries you most about the college application process?"
                    value={formData.biggestStressor}
                    onChange={(e) => handleInputChange('biggestStressor', e.target.value)}
                    className={`mt-2 w-full p-3 border rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#457BF5] focus:border-[#457BF5] ${
                      getFieldStatus('biggestStressor') === 'error' ? 'border-red-500 bg-red-50' :
                      getFieldStatus('biggestStressor') === 'success' ? 'border-green-500 bg-green-50' : 'border-[#457BF5]'
                    }`}
                  />
                  {fieldErrors.biggestStressor && touchedFields.biggestStressor && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.biggestStressor}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Parent's Biggest Worry *
                </Label>
                <div className="relative">
                  <textarea
                    placeholder="What does your parent worry about most regarding college?"
                    value={formData.parentWorry}
                    onChange={(e) => handleInputChange('parentWorry', e.target.value)}
                    className={`mt-2 w-full p-3 border rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#457BF5] focus:border-[#457BF5] ${
                      getFieldStatus('parentWorry') === 'error' ? 'border-red-500 bg-red-50' :
                      getFieldStatus('parentWorry') === 'success' ? 'border-green-500 bg-green-50' : 'border-[#457BF5]'
                    }`}
                  />
                  {fieldErrors.parentWorry && touchedFields.parentWorry && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.parentWorry}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Registration Code *</Label>
                <div className="mt-2">
                  {renderInputField('registrationCode', 'Enter your registration code')}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
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

          {/* Overall Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}% Complete</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          {/* Form Content */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
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
                    Continue
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={submitMutation.isPending}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 px-6"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Application"}
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

export default InteractiveRegistrationForm
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const submitRegistration = async (formData) => {
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      graduationYear: new Date(formData.graduationYear),
      currentGPA: parseFloat(formData.currentGPA)
    })
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'Registration failed')
  }
  
  return data
}

export const useSubmitRegistration = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: submitRegistration,
    onSuccess: (data) => {
      toast.success("Registration submitted successfully! Thank you for joining College Mastermind.")
      // Invalidate and refetch any queries related to students
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed. Please try again.")
    }
  })
}

// Validation helpers
export const validateStep = (step, formData) => {
  const errors = []
  
  switch (step) {
    case 1:
      if (!formData.firstName?.trim()) errors.push("First name is required")
      if (!formData.lastName?.trim()) errors.push("Last name is required")
      if (!formData.email?.trim()) errors.push("Email is required")
      if (formData.email && !formData.email.includes('@')) errors.push("Valid email is required")
      if (!formData.graduationYear) errors.push("Graduation year is required")
      if (!formData.highSchoolName?.trim()) errors.push("High school name is required")
      if (!formData.phoneNumber?.trim()) errors.push("Phone number is required")
      break
      
    case 2:
      if (!formData.parentFirstName?.trim()) errors.push("Parent first name is required")
      if (!formData.parentLastName?.trim()) errors.push("Parent last name is required")
      if (!formData.parentEmail?.trim()) errors.push("Parent email is required")
      if (formData.parentEmail && !formData.parentEmail.includes('@')) errors.push("Valid parent email is required")
      if (!formData.parentPhoneNumber?.trim()) errors.push("Parent phone number is required")
      if (!formData.address?.trim()) errors.push("Address is required")
      if (!formData.zipCode?.trim()) errors.push("Zip code is required")
      if (!formData.city?.trim()) errors.push("City is required")
      if (!formData.state?.trim()) errors.push("State is required")
      break
      
    case 3:
      if (!formData.currentGPA) errors.push("GPA is required")
      if (formData.currentGPA && (parseFloat(formData.currentGPA) < 0 || parseFloat(formData.currentGPA) > 4)) {
        errors.push("GPA must be between 0.0 and 4.0")
      }
      break
      
    case 4:
      if (!formData.biggestStressor?.trim()) errors.push("Biggest stressor is required")
      if (!formData.parentWorry?.trim()) errors.push("Parent worry is required")
      if (!formData.registrationCode?.trim()) errors.push("Registration code is required")
      break
  }
  
  return errors
}

export const getStepProgress = (step, formData) => {
  const totalFields = {
    1: 7, // firstName, lastName, email, graduationYear, highSchoolName, phoneNumber, gender
    2: 9, // parentFirstName, parentLastName, parentEmail, parentPhoneNumber, address, zipCode, city, state
    3: 3, // currentGPA, classRigor, universitiesWant
    4: 4  // satActScores (optional), biggestStressor, parentWorry, registrationCode
  }
  
  const filledFields = {
    1: [
      formData.firstName, formData.lastName, formData.email, formData.graduationYear,
      formData.highSchoolName, formData.phoneNumber, formData.gender
    ].filter(Boolean).length,
    2: [
      formData.parentFirstName, formData.parentLastName, formData.parentEmail,
      formData.parentPhoneNumber, formData.address, formData.zipCode, formData.city, formData.state
    ].filter(Boolean).length,
    3: [
      formData.currentGPA, formData.classRigor, formData.universitiesWant
    ].filter(Boolean).length,
    4: [
      formData.biggestStressor, formData.parentWorry, formData.registrationCode
    ].filter(Boolean).length + (formData.satActScores ? 1 : 0)
  }
  
  return Math.round((filledFields[step] / totalFields[step]) * 100)
}
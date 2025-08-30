"use client"

import { useState } from "react"
import { useEnrollmentCounts } from "@/hooks/useEnrollment"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Users, Clock, Calendar } from "lucide-react"
import StudentListModal from "./StudentListModal"

const EnrollmentTracking = () => {
  const { data: enrollmentData, isLoading, error, refetch } = useEnrollmentCounts()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({ title: '', filterType: '', filterValue: '' })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Class Enrollment Tracking</h2>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <div>
            <h3 className="text-red-800 font-medium">Failed to Load Enrollment Data</h3>
            <p className="text-red-600 text-sm">Unable to fetch current enrollment counts. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  const enrollments = enrollmentData?.enrollments || {}
  const minimumRequired = enrollmentData?.minimumRequired || 40
  const totalEnrolled = Object.values(enrollments).reduce((sum, count) => sum + count, 0)

  const handleViewStudents = (title, classTime) => {
    setModalData({
      title,
      filterType: 'classTime',
      filterValue: classTime
    })
    setModalOpen(true)
  }

  const classTimeSlots = [
    { 
      time: "Mon & Wed - 4:00 PM Pacific", 
      icon: <Calendar className="w-5 h-5" />,
      day: "Monday & Wednesday",
      period: "Afternoon"
    },
    { 
      time: "Mon & Wed - 7:00 PM Pacific", 
      icon: <Clock className="w-5 h-5" />,
      day: "Monday & Wednesday", 
      period: "Evening"
    },
    { 
      time: "Tue & Thu - 4:00 PM Pacific", 
      icon: <Calendar className="w-5 h-5" />,
      day: "Tuesday & Thursday",
      period: "Afternoon"
    },
    { 
      time: "Tue & Thu - 7:00 PM Pacific", 
      icon: <Clock className="w-5 h-5" />,
      day: "Tuesday & Thursday",
      period: "Evening"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Class Enrollment Tracking</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Enrolled</p>
              <p className="text-2xl font-semibold text-gray-900">{totalEnrolled}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Classes Ready</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(enrollments).filter(count => count >= minimumRequired).length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Need Students</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(enrollments).filter(count => count < minimumRequired).length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Min Required</p>
              <p className="text-2xl font-semibold text-gray-900">{minimumRequired}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Time Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classTimeSlots.map(slot => {
          const enrollmentCount = enrollments[slot.time] || 0
          const progress = Math.min((enrollmentCount / minimumRequired) * 100, 100)
          const isReady = enrollmentCount >= minimumRequired
          const studentsNeeded = Math.max(minimumRequired - enrollmentCount, 0)

          return (
            <Card 
              key={slot.time} 
              className="border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
              onClick={() => handleViewStudents(`Students - ${slot.day} ${slot.period}`, slot.time)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-gray-900">{slot.day}</CardTitle>
                    <p className="text-sm text-gray-600">{slot.period} Session</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${isReady ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-600'}`}>
                    {isReady ? "Ready" : "Needs Students"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="text-gray-600">
                      {enrollmentCount} / {minimumRequired}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-600 h-2 rounded-full transition-all" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {slot.time.includes('4:00') ? '4:00-6:00 PM' : '7:00-9:00 PM'} Pacific
                    </span>
                    {!isReady && (
                      <span className="text-gray-600">
                        Need {studentsNeeded} more
                      </span>
                    )}
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Click to view students
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Data Refresh Info */}
      <div className="bg-gray-50 border border-gray-200 rounded p-3">
        <div className="text-sm text-gray-600">
          <strong>Note:</strong> Enrollment data automatically refreshes every 3 seconds.
        </div>
      </div>

      {/* Student List Modal */}
      <StudentListModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        filterType={modalData.filterType}
        filterValue={modalData.filterValue}
      />
    </div>
  )
}

export default EnrollmentTracking

"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StudentChatTab from '@/components/student/StudentChatTab'
import ScheduleManager from '@/components/student/ScheduleManager'
import ParentalApprovalModal from '@/components/student/ParentalApprovalModal'
import { useChatMessages } from '@/hooks/useChat'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  GraduationCap, 
  MapPin, 
  Users, 
  Star,
  BookOpen,
  Target,
  LogOut,
  Settings,
  MessageSquare
} from 'lucide-react'

export default function StudentDashboard({ student, onLogout, onRefreshStudent }) {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Check if parental approval is required
  const needsParentalApproval = student?.parentalApprovalStatus !== 'approved'

  // Chat Tab Button with notification badge
  const ChatTabButton = ({ student, isActive, onClick, icon: Icon, label }) => {
    const studentEmail = student?.email;
    
    const { data: chatData } = useChatMessages(studentEmail, {
      enabled: !!studentEmail,
      refetchInterval: 10000 // Check for new messages every 10 seconds
    });

    const messages = chatData?.messages || [];
    const unreadAdminMessages = messages.filter(
      msg => msg.sender === 'admin' && msg.status !== 'read'
    ).length;

    return (
      <button
        onClick={onClick}
        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 relative ${
          isActive
            ? 'border-[#457BF5] text-[#457BF5]'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
        {unreadAdminMessages > 0 && (
          <Badge variant="destructive" className="ml-1 text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
            {unreadAdminMessages}
          </Badge>
        )}
      </button>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'contacted': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'academic', label: 'Academic Info', icon: BookOpen },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'chat', label: 'Chat', icon: MessageSquare }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#457BF5] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {student.firstName?.[0]}{student.lastName?.[0]}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {student.firstName} {student.lastName}
                </h1>
                <p className="text-gray-600">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getStatusColor(student.status)}>
                {student.status || 'pending'}
              </Badge>
              <Button
                onClick={onLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              
              // Special handling for chat tab with notifications
              if (tab.id === 'chat') {
                return (
                  <ChatTabButton
                    key={tab.id}
                    student={student}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    icon={Icon}
                    label={tab.label}
                  />
                )
              }
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-[#457BF5] text-[#457BF5]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#457BF5]">
                  {student.classTime || 'Not scheduled'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Diagnostic Test</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {student.diagnosticTestDate ? 
                    (student.diagnosticTestDate.includes('Saturday') ? 'Saturday' : 
                     student.diagnosticTestDate.includes('Sunday') ? 'Sunday' : 'Custom')
                    : 'Not scheduled'
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {student.currentGPA || 'N/A'}
                </div>
              </CardContent>
            </Card>

            {/* Registration Status */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Registration Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Registration Submitted</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      ✓ Complete
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Class Assignment</span>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status === 'pending' ? 'In Progress' : 
                       student.status === 'reviewed' ? 'Under Review' : 'Confirmed'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Submitted on: {formatDate(student.submittedAt)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {/* Current Schedule Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Class Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Selected Time Slot</label>
                    <p className="text-lg font-semibold text-[#457BF5] mt-1">
                      {student.classTime || 'Not yet assigned'}
                    </p>
                  </div>
                  {student.classTime && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Class Details</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Duration: 2 hours per session</li>
                        <li>• Format: Live interactive sessions</li>
                        <li>• Materials: Provided digitally</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Diagnostic Test
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Test Date</label>
                    <p className="text-lg font-semibold text-green-600 mt-1">
                      {student.diagnosticTestDate || 'Not scheduled'}
                    </p>
                  </div>
                  {student.diagnosticTestDate && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Test Information</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Duration: 3.5 hours</li>
                        <li>• Format: Full SAT practice test</li>
                        <li>• Results: Available within 48 hours</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Schedule Manager Component */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Your Schedule</h3>
              <ScheduleManager />
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current GPA</label>
                    <p className="text-lg font-semibold mt-1">{student.currentGPA || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Graduation Year</label>
                    <p className="text-lg font-semibold mt-1">{formatDate(student.graduationYear)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">High School</label>
                  <p className="text-lg font-semibold mt-1">{student.highSchoolName || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Class Rigor</label>
                  <p className="text-lg font-semibold mt-1">{student.classRigor || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">University Goal</label>
                  <p className="text-lg font-semibold mt-1">{student.universitiesWant || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  College Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Top College Choices</label>
                  <p className="text-lg mt-1">{student.topCollegeChoices || 'Not specified'}</p>
                </div>
                {student.satActScores && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current SAT/ACT Scores</label>
                    <p className="text-lg mt-1">{student.satActScores}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Student Type</label>
                  <p className="text-lg mt-1">{student.typeOfStudent || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Student Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-lg">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-lg">{student.phoneNumber || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-700">State</label>
                    <p className="text-lg">{student.state || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Parent/Guardian Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-lg">
                    {student.parentFirstName} {student.parentLastName}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-lg">{student.parentEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-lg">{student.parentPhoneNumber || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <StudentChatTab student={student} />
          </div>
        )}
      </div>

      {/* Parental Approval Modal - shows when approval is needed */}
      {needsParentalApproval && (
        <ParentalApprovalModal 
          student={student} 
          onRefresh={onRefreshStudent}
        />
      )}

      {/* Access Restriction Overlay - dims content when approval is pending */}
      {needsParentalApproval && (
        <div className="fixed inset-0 bg-white bg-opacity-75 z-40 pointer-events-none" 
             style={{ backdropFilter: 'blur(2px)' }} />
      )}
    </div>
  )
}
"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StudentChatTab from '@/components/student/StudentChatTab'
import ScheduleManager from '@/components/student/ScheduleManager'
import ParentalApprovalModal from '@/components/student/ParentalApprovalModal'
import BookingWidget from '@/components/student/BookingWidget'
import AssignmentTab from '@/components/student/AssignmentTab'
import ResultsTab from '@/components/student/ResultsTab'
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
  MessageSquare,
  HelpCircle,
  RefreshCw,
  FileText,
  Trophy,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function StudentDashboard({ student, onLogout, onRefreshStudent }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshing, setRefreshing] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const scrollContainerRef = useRef(null)
  
  // Check if parental approval is required
  const needsParentalApproval = student?.parentalApprovalStatus !== 'approved'

  // Chat data for notifications - call at top level
  const studentEmail = student?.email;
  const { data: chatData } = useChatMessages(studentEmail, {
    enabled: !!studentEmail,
    refetchInterval: 10000 // Check for new messages every 10 seconds
  });

  const messages = chatData?.messages || [];
  const unreadAdminMessages = messages.filter(
    msg => msg.sender === 'admin' && msg.status !== 'read'
  ).length;

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await onRefreshStudent()
    } finally {
      setTimeout(() => setRefreshing(false), 1000)
    }
  }

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setMobileMenuOpen(false)
  }

  // Chat Tab Button with notification badge
  const ChatTabButton = ({ isActive, onClick, icon: Icon, label, unreadCount }) => {
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
        {unreadCount > 0 && (
          <Badge variant="destructive" className="ml-1 text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
            {unreadCount}
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
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'results', label: 'Results', icon: Trophy },
    { id: 'academic', label: 'Academic Info', icon: BookOpen },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'help', label: 'Get Personalized Help', icon: HelpCircle },
    { id: 'chat', label: 'Chat', icon: MessageSquare }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#457BF5] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg">
                    {student.firstName?.[0]}{student.lastName?.[0]}
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                  Welcome, {student.firstName} {student.lastName}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Badge className={`${getStatusColor(student.status)} text-xs sm:text-sm`}>
                {student.status || 'pending'}
              </Badge>
              <div className="hidden sm:flex items-center space-x-2">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  disabled={refreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
              {/* Mobile menu button */}
              <div className="sm:hidden">
                <Button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t bg-gray-50 py-2">
              <div className="flex flex-col space-y-2 px-4">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  disabled={refreshing}
                  className="flex items-center gap-2 justify-start"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 justify-start"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden lg:block px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                
                // Special handling for chat tab with notifications
                if (tab.id === 'chat') {
                  return (
                    <ChatTabButton
                      key={tab.id}
                      isActive={activeTab === tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      icon={Icon}
                      label={tab.label}
                      unreadCount={unreadAdminMessages}
                    />
                  )
                }
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap ${
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

          {/* Tablet Navigation with scroll */}
          <div className="hidden md:block lg:hidden px-4 sm:px-6">
            <div className="relative">
              <button
                onClick={() => scrollTabs('left')}
                className="absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-white to-transparent w-8 flex items-center justify-center hover:from-gray-50"
              >
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </button>
              
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <nav className="flex space-x-6 min-w-max">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    
                    if (tab.id === 'chat') {
                      return (
                        <ChatTabButton
                          key={tab.id}
                          isActive={activeTab === tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          icon={Icon}
                          label={tab.label}
                          unreadCount={unreadAdminMessages}
                        />
                      )
                    }
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap ${
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
              
              <button
                onClick={() => scrollTabs('right')}
                className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-white to-transparent w-8 flex items-center justify-center hover:from-gray-50"
              >
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Dropdown */}
          <div className="md:hidden px-4">
            <div className="py-3">
              <div className="relative">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                    mobileMenuOpen 
                      ? 'border-[#457BF5] bg-blue-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const activeTabData = tabs.find(tab => tab.id === activeTab)
                      const Icon = activeTabData?.icon || User
                      return (
                        <>
                          <Icon className="h-5 w-5 text-[#457BF5]" />
                          <span className="font-medium text-gray-900">
                            {activeTabData?.label || 'Overview'}
                          </span>
                        </>
                      )
                    })()}
                  </div>
                  <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {mobileMenuOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      const isActive = activeTab === tab.id
                      
                      if (tab.id === 'chat') {
                        return (
                          <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                              isActive ? 'bg-blue-50 text-[#457BF5]' : 'text-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span className="font-medium">{tab.label}</span>
                            </div>
                            {unreadAdminMessages > 0 && (
                              <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                {unreadAdminMessages}
                              </Badge>
                            )}
                          </button>
                        )
                      }
                      
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                            isActive ? 'bg-blue-50 text-[#457BF5]' : 'text-gray-700'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
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
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-3">Class Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                          <span className="font-medium text-blue-600 uppercase tracking-wide">Duration: 1 Hour per Session</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                          <span className="font-medium text-blue-600 uppercase tracking-wide">Format: Live Interactive Sessions</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                          <span className="font-medium text-blue-600 uppercase tracking-wide">Materials: Provided Digitally</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="font-medium text-gray-700 mb-1">Meeting Link:</div>
                            <a 
                              href="https://us02web.zoom.us/j/8980721475" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline break-all"
                            >
                              https://us02web.zoom.us/j/8980721475
                            </a>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <div className="font-medium text-gray-700 mb-1">Online Session:</div>
                              <div className="text-blue-600 font-medium">Room 17</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-700 mb-1">Office Hours:</div>
                              <div className="text-blue-600 font-medium">Room 18</div>
                            </div>
                          </div>
                        </div>
                      </div>
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

        {activeTab === 'help' && (
          <div className="max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-[#457BF5]" />
                  Get Personalized Help
                </CardTitle>
                <p className="text-gray-600">
                  Schedule a one-on-one consultation with our college admission experts
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-lg mb-2">What to Expect:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#457BF5] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Personalized college admission strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#457BF5] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Review of your application materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#457BF5] rounded-full mt-2 flex-shrink-0"></div>
                      <span>SAT/ACT test preparation guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#457BF5] rounded-full mt-2 flex-shrink-0"></div>
                      <span>College selection and application timeline</span>
                    </li>
                  </ul>
                </div>
                
                {/* Embedded Booking Widget */}
                <BookingWidget />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="max-w-6xl mx-auto">
            <AssignmentTab student={student} />
          </div>
        )}

        {activeTab === 'results' && (
          <div className="max-w-6xl mx-auto">
            <ResultsTab student={student} />
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
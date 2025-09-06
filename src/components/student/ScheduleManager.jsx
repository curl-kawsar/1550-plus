"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, AlertTriangle, CheckCircle2, History, RefreshCw } from 'lucide-react'
import { useStudentSchedule, useChangeSchedule } from '@/hooks/useStudentSchedule'
import { toast } from 'sonner'

const ScheduleManager = () => {
  const { data: scheduleData, isLoading, error, refetch, isRefetching } = useStudentSchedule()
  const changeScheduleMutation = useChangeSchedule()
  const [activeChangeType, setActiveChangeType] = useState(null)
  const [selectedValue, setSelectedValue] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
      toast.success('Schedule data refreshed')
    } finally {
      setTimeout(() => setRefreshing(false), 1000)
    }
  }

  const classTimeOptions = [
    'Mon & Wed - 4:00 PM Pacific',
    'Mon & Wed - 7:00 PM Pacific',
    'Tue & Thu - 4:00 PM Pacific',
    'Tue & Thu - 7:00 PM Pacific'
  ]

  const diagnosticTestOptions = [
    'Saturday September 27th 8:30am - noon PST',
    'Sunday September 28th 8:30am - noon PST',
    'I can\'t make either of these dates (reply below with if neither option works for you)'
  ]

  const handleChangeRequest = (changeType) => {
    if (!scheduleData?.canChange[changeType]) {
      toast.error(`You have already used all 2 changes for ${changeType === 'classTime' ? 'class time' : 'diagnostic test'}`)
      return
    }
    
    setActiveChangeType(changeType)
    setSelectedValue('')
  }

  const handleConfirmChange = () => {
    if (!selectedValue) {
      toast.error('Please select an option')
      return
    }

    if (activeChangeType === 'classTime' && selectedValue === scheduleData?.currentSchedule?.classTime) {
      toast.error('You are already enrolled in this class time')
      return
    }

    if (activeChangeType === 'diagnosticTest' && selectedValue === scheduleData?.currentSchedule?.diagnosticTestDate) {
      toast.error('You are already enrolled in this diagnostic test')
      return
    }

    changeScheduleMutation.mutate({
      changeType: activeChangeType,
      newValue: selectedValue
    }, {
      onSuccess: () => {
        setActiveChangeType(null)
        setSelectedValue('')
      }
    })
  }

  const handleCancel = () => {
    setActiveChangeType(null)
    setSelectedValue('')
  }

  const formatChangeHistory = (history) => {
    if (!history || history.length === 0) return 'No changes made'
    
    return history.map((change, index) => (
      <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-1">
        <div className="font-medium">Change #{index + 1}</div>
        <div>From: {change.from}</div>
        <div>To: {change.to}</div>
        <div>Date: {new Date(change.changedAt).toLocaleDateString()}</div>
      </div>
    )).slice(-2) // Show only last 2 changes
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-10 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p>Failed to load schedule information</p>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm" 
              className="mt-2"
              disabled={refreshing || isRefetching}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${(refreshing || isRefetching) ? 'animate-spin' : ''}`} />
              {(refreshing || isRefetching) ? 'Retrying...' : 'Try Again'}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { currentSchedule, changeCounts, canChange, changeHistory } = scheduleData

  return (
    <div className="space-y-6">
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Schedule Management</h3>
          <p className="text-sm text-gray-600">Manage your class time and diagnostic test schedule</p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={refreshing || isRefetching}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${(refreshing || isRefetching) ? 'animate-spin' : ''}`} />
          {(refreshing || isRefetching) ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Class Time Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Class Time
            <Badge variant={canChange.classTime ? "default" : "secondary"} className="ml-auto">
              {changeCounts.classTime}/2 changes used
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Current Schedule:</div>
            <div className="font-medium text-blue-900">{currentSchedule.classTime}</div>
          </div>

          {activeChangeType === 'classTime' ? (
            <div className="space-y-4 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
              <div className="text-sm font-medium text-blue-900">Select new class time:</div>
              <div className="space-y-2">
                {classTimeOptions.map((option) => (
                  <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="classTime"
                      value={option}
                      checked={selectedValue === option}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <span className={selectedValue === option ? 'text-blue-600 font-medium' : ''}>
                      {option}
                    </span>
                    {option === currentSchedule.classTime && (
                      <Badge variant="outline" className="ml-auto">Current</Badge>
                    )}
                  </label>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={handleConfirmChange}
                  disabled={!selectedValue || changeScheduleMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {changeScheduleMutation.isPending ? 'Updating...' : 'Confirm Change'}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {canChange.classTime ? (
                  <span className="text-green-600">✓ You can change your class time {2 - changeCounts.classTime} more time(s)</span>
                ) : (
                  <span className="text-red-600">✗ No more changes available</span>
                )}
              </div>
              <Button 
                onClick={() => handleChangeRequest('classTime')}
                disabled={!canChange.classTime}
                variant={canChange.classTime ? "default" : "secondary"}
                size="sm"
              >
                {canChange.classTime ? 'Change Class Time' : 'Changes Used Up'}
              </Button>
            </div>
          )}

          {changeCounts.classTime > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 flex items-center gap-2">
                <History className="w-4 h-4" />
                View Change History
              </summary>
              <div className="mt-2 space-y-1">
                {formatChangeHistory(changeHistory.classTime)}
              </div>
            </details>
          )}
        </CardContent>
      </Card>

      {/* Diagnostic Test Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Diagnostic Test
            <Badge variant={canChange.diagnosticTest ? "default" : "secondary"} className="ml-auto">
              {changeCounts.diagnosticTest}/2 changes used
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Current Schedule:</div>
            <div className="font-medium text-green-900">{currentSchedule.diagnosticTestDate}</div>
          </div>

          {activeChangeType === 'diagnosticTest' ? (
            <div className="space-y-4 p-4 border-2 border-green-200 rounded-lg bg-green-50">
              <div className="text-sm font-medium text-green-900">Select new diagnostic test date:</div>
              <div className="space-y-2">
                {diagnosticTestOptions.map((option) => (
                  <label key={option} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="diagnosticTest"
                      value={option}
                      checked={selectedValue === option}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      className="mr-3 mt-1 text-green-600"
                    />
                    <span className={selectedValue === option ? 'text-green-600 font-medium' : ''}>
                      {option}
                    </span>
                    {option === currentSchedule.diagnosticTestDate && (
                      <Badge variant="outline" className="ml-auto">Current</Badge>
                    )}
                  </label>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={handleConfirmChange}
                  disabled={!selectedValue || changeScheduleMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {changeScheduleMutation.isPending ? 'Updating...' : 'Confirm Change'}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {canChange.diagnosticTest ? (
                  <span className="text-green-600">✓ You can change your diagnostic test {2 - changeCounts.diagnosticTest} more time(s)</span>
                ) : (
                  <span className="text-red-600">✗ No more changes available</span>
                )}
              </div>
              <Button 
                onClick={() => handleChangeRequest('diagnosticTest')}
                disabled={!canChange.diagnosticTest}
                variant={canChange.diagnosticTest ? "default" : "secondary"}
                size="sm"
              >
                {canChange.diagnosticTest ? 'Change Test Date' : 'Changes Used Up'}
              </Button>
            </div>
          )}

          {changeCounts.diagnosticTest > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 flex items-center gap-2">
                <History className="w-4 h-4" />
                View Change History
              </summary>
              <div className="mt-2 space-y-1">
                {formatChangeHistory(changeHistory.diagnosticTest)}
              </div>
            </details>
          )}
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-orange-900 mb-1">Important Notice</div>
              <p className="text-orange-800">
                You can only change your class time and diagnostic test date up to 2 times each. 
                Please choose carefully as changes cannot be undone once you reach the limit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScheduleManager
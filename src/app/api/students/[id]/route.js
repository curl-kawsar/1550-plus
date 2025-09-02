import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Student from '@/models/Student';
import { verifyAdminToken } from '@/lib/auth';

// GET single student
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ student });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update student (Admin only)
export async function PUT(request, { params }) {
  try {
    // Verify admin authentication
    const adminUser = await verifyAdminToken(request);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const updateData = await request.json();
    
    await connectToDatabase();
    
    // Only allow specific fields to be updated
    const allowedFields = [
      'classTime',
      'diagnosticTestDate',
      'status',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'currentGPA',
      'universitiesWant'
    ];
    
    const filteredData = {};
    for (const field of allowedFields) {
      if (updateData.hasOwnProperty(field)) {
        let value = updateData[field];
        
        // Handle classTime enum mapping
        if (field === 'classTime') {
          // Admin interface now uses correct format, no mapping needed
          // Keep for backward compatibility with any legacy data
          const classTimeMapping = {
            'Monday-Wednesday 4:00pm-6:00pm EST': 'Mon & Wed - 4:00 PM Pacific',
            'Monday-Wednesday 6:00pm-8:00pm EST': 'Mon & Wed - 7:00 PM Pacific',
            'Tuesday-Thursday 4:00pm-6:00pm EST': 'Tue & Thu - 4:00 PM Pacific',
            'Tuesday-Thursday 6:00pm-8:00pm EST': 'Tue & Thu - 7:00 PM Pacific'
          };
          value = classTimeMapping[value] || value;
        }
        
        // Handle diagnosticTestDate enum mapping
        if (field === 'diagnosticTestDate') {
          // Admin interface now uses correct format, no mapping needed
          // Keep for backward compatibility with any legacy data
          const diagnosticMapping = {
            'Saturday, September 27th at 8:30am EST': 'Saturday September 27th 8:30am - noon PST',
            'Sunday, September 28th at 8:30am EST': 'Sunday September 28th 8:30am - noon PST',
            'I cannot attend either date': 'I can\'t make either of these dates (reply below with if neither option works for you)',
            'I can\'t make either of these dates': 'I can\'t make either of these dates (reply below with if neither option works for you)'
          };
          value = diagnosticMapping[value] || value;
        }
        
        filteredData[field] = value;
      }
    }
    
    const student = await Student.findByIdAndUpdate(
      id,
      filteredData,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Student updated successfully',
      student 
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE student (Admin only)
export async function DELETE(request, { params }) {
  try {
    // Verify admin authentication
    const adminUser = await verifyAdminToken(request);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectToDatabase();
    
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Student deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Student from '@/models/Student';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'graduationYear', 'highSchoolName', 
      'phoneNumber', 'gender', 'currentGPA', 'parentFirstName', 'parentLastName', 
      'parentEmail', 'parentPhoneNumber', 'state', 'classRigor', 'universitiesWant', 
      'typeOfStudent', 'registrationCode', 'classTime', 'diagnosticTestDate'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Check if email already exists
    const existingStudent = await Student.findOne({ email: body.email });
    if (existingStudent) {
      return NextResponse.json(
        { error: 'A student with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create new student
    const student = new Student(body);
    await student.save();
    
    return NextResponse.json(
      { 
        message: 'Student registration submitted successfully',
        studentId: student._id 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating student:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A student with this email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const diagnosticTest = searchParams.get('diagnosticTest');
    const classTime = searchParams.get('classTime');
    
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { highSchoolName: { $regex: search, $options: 'i' } }
      ];
    }
    if (diagnosticTest) {
      if (diagnosticTest === 'saturday') {
        query.diagnosticTestDate = { $regex: 'Saturday', $options: 'i' };
      } else if (diagnosticTest === 'sunday') {
        query.diagnosticTestDate = { $regex: 'Sunday', $options: 'i' };
      } else if (diagnosticTest === 'cannot') {
        query.diagnosticTestDate = { $regex: 'can\'t make either', $options: 'i' };
      }
    }
    if (classTime) {
      query.classTime = classTime;
    }
    
    // Get students with pagination
    const students = await Student.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await Student.countDocuments(query);
    
    return NextResponse.json({
      students,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalStudents: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
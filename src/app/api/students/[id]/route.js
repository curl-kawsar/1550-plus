import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Student from '@/models/Student';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }
    
    const student = await Student.findById(id).lean();
    
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

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const body = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }
    
    // Only allow updating status and internal notes
    const allowedUpdates = ['status'];
    const updates = {};
    
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }
    
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }
    
    const student = await Student.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).lean();
    
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

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }
    
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
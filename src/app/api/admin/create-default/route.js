import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST() {
  try {
    await connectToDatabase();
    
    // Check if default admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@collegemastermind.com' });
    
    if (existingAdmin) {
      return NextResponse.json({
        message: 'Default admin already exists'
      });
    }
    
    // Create default admin
    const defaultAdmin = new Admin({
      email: 'admin@collegemastermind.com',
      password: 'admin123',
      name: 'College Mastermind Admin',
      role: 'super-admin'
    });
    
    await defaultAdmin.save();
    
    return NextResponse.json({
      message: 'Default admin created successfully',
      admin: {
        email: defaultAdmin.email,
        name: defaultAdmin.name,
        role: defaultAdmin.role
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating default admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';
import ClassTime from '@/models/ClassTime';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Verify admin token
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'No authentication token' }, { status: 401 });
    }
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (jwtError) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    
    if (!['admin', 'super-admin'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const results = {
      adminCreated: false,
      classTimesCreated: 0,
      errors: []
    };

    // Create default admin if none exists
    try {
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0) {
        const defaultAdmin = new Admin({
          email: 'admin@1550plus.com',
          password: 'admin123', // Will be hashed by the model
          name: 'System Administrator',
          role: 'super-admin'
        });
        await defaultAdmin.save();
        results.adminCreated = true;
      }
    } catch (error) {
      results.errors.push(`Failed to create admin: ${error.message}`);
    }

    // Create default class times if none exist
    try {
      const classTimeCount = await ClassTime.countDocuments();
      if (classTimeCount === 0) {
        const defaultClassTimes = [
          {
            name: 'Mon & Wed - 4:00 PM Pacific',
            dayOfWeek: ['Monday', 'Wednesday'],
            startTime: '16:00',
            endTime: '17:00',
            timezone: 'Pacific',
            capacity: 50,
            minimumRequired: 40,
            description: 'Monday and Wednesday afternoon class',
            sortOrder: 1,
            isActive: true,
            createdBy: decoded.adminId
          },
          {
            name: 'Mon & Wed - 7:00 PM Pacific',
            dayOfWeek: ['Monday', 'Wednesday'],
            startTime: '19:00',
            endTime: '20:00',
            timezone: 'Pacific',
            capacity: 50,
            minimumRequired: 40,
            description: 'Monday and Wednesday evening class',
            sortOrder: 2,
            isActive: true,
            createdBy: decoded.adminId
          },
          {
            name: 'Tue & Thu - 4:00 PM Pacific',
            dayOfWeek: ['Tuesday', 'Thursday'],
            startTime: '16:00',
            endTime: '17:00',
            timezone: 'Pacific',
            capacity: 50,
            minimumRequired: 40,
            description: 'Tuesday and Thursday afternoon class',
            sortOrder: 3,
            isActive: true,
            createdBy: decoded.adminId
          },
          {
            name: 'Tue & Thu - 7:00 PM Pacific',
            dayOfWeek: ['Tuesday', 'Thursday'],
            startTime: '19:00',
            endTime: '20:00',
            timezone: 'Pacific',
            capacity: 50,
            minimumRequired: 40,
            description: 'Tuesday and Thursday evening class',
            sortOrder: 4,
            isActive: true,
            createdBy: decoded.adminId
          }
        ];

        for (const classTimeData of defaultClassTimes) {
          try {
            const classTime = new ClassTime(classTimeData);
            await classTime.save();
            results.classTimesCreated++;
          } catch (error) {
            results.errors.push(`Failed to create class time "${classTimeData.name}": ${error.message}`);
          }
        }
      }
    } catch (error) {
      results.errors.push(`Failed to create class times: ${error.message}`);
    }

    return NextResponse.json({
      message: 'Default data creation completed',
      results
    });

  } catch (error) {
    console.error('Error creating default data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
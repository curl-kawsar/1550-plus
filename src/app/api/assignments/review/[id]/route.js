import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import Assignment from '@/models/Assignment';
import AssignmentSubmission from '@/models/AssignmentSubmission';
import jwt from 'jsonwebtoken';

// Get assignment review for student (shows their answers and correct answers)
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    // Verify student token
    const cookieStore = await cookies();
    const token = cookieStore.get('student-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'No authentication token' }, { status: 401 });
    }
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (jwtError) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    
    const studentId = decoded.studentId;
    
    // Get assignment
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }
    
    // Get student's submission
    const submission = await AssignmentSubmission.findOne({ 
      assignmentId: id, 
      studentId 
    });
    
    if (!submission) {
      return NextResponse.json({ error: 'No submission found for this assignment' }, { status: 404 });
    }
    
    // Create review data with questions, student answers, and correct answers
    const reviewData = {
      assignment: {
        _id: assignment._id,
        title: assignment.title,
        description: assignment.description,
        totalQuestions: assignment.totalQuestions,
        timeLimit: assignment.timeLimit
      },
      submission: {
        _id: submission._id,
        score: submission.score,
        percentage: submission.percentage,
        totalQuestions: submission.totalQuestions,
        correctAnswers: submission.correctAnswers,
        timeSpent: submission.timeSpent,
        submittedAt: submission.submittedAt
      },
      questions: assignment.questions.map((question, index) => {
        const studentAnswer = submission.answers[index];
        
        return {
          _id: question._id,
          questionNumber: index + 1,
          question: question.question,
          instruction: question.instruction,
          options: {
            A: question.optionA,
            B: question.optionB,
            C: question.optionC,
            D: question.optionD
          },
          correctAnswer: question.answer,
          studentAnswer: studentAnswer?.selectedAnswer || null,
          isCorrect: studentAnswer?.isCorrect || false
        };
      })
    };
    
    // Calculate grade
    let grade = 'F';
    if (submission.percentage >= 90) grade = 'A';
    else if (submission.percentage >= 80) grade = 'B';
    else if (submission.percentage >= 70) grade = 'C';
    else if (submission.percentage >= 60) grade = 'D';
    
    reviewData.submission.grade = grade;
    
    return NextResponse.json(reviewData);
    
  } catch (error) {
    console.error('Error fetching assignment review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

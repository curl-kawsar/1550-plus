import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  // Student Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  graduationYear: {
    type: Date,
    required: true
  },
  highSchoolName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },

  // Parent Information
  parentFirstName: {
    type: String,
    required: true,
    trim: true
  },
  parentLastName: {
    type: String,
    required: true,
    trim: true
  },
  parentEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  parentPhoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },

  // Academic Information
  currentGPA: {
    type: Number,
    required: true,
    min: 0,
    max: 4
  },
  classRigor: {
    type: String,
    required: true,
    enum: ['Mostly Honors and AP', 'Some Honors and AP', 'No Honors or AP']
  },
  universitiesWant: {
    type: String,
    required: true,
    enum: ['Ivy League/Top 20', 'Top 50', 'Top 100', 'Selective State University', 'Anywhere I can']
  },

  // Academic Information Part 2
  satActScores: {
    type: String,
    required: false,
    trim: true
  },
  biggestStressor: {
    type: String,
    required: true,
    trim: true
  },
  parentWorry: {
    type: String,
    required: true,
    trim: true
  },
  registrationCode: {
    type: String,
    required: true,
    trim: true
  },

  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'contacted'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
StudentSchema.index({ email: 1 });
StudentSchema.index({ submittedAt: -1 });
StudentSchema.index({ status: 1 });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
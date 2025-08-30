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
  topCollegeChoices: {
    type: String,
    required: false,
    trim: true
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
  typeOfStudent: {
    type: String,
    required: true,
    enum: [
      'I usually wait until the last minute to get things done. Motivated sometimes, but inconsistent.',
      'I generally bring my stuff and finish on time, but I don\'t always get top results.',
      'I am usually very slow to work and achieve awesome results. I get stressed if I don\'t succeed!'
    ],
    trim: true
  },
  biggestStressor: {
    type: String,
    required: false,
    trim: true
  },
  parentWorry: {
    type: String,
    required: false,
    trim: true
  },
  registrationCode: {
    type: String,
    required: true,
    trim: true
  },
  
  // Class Schedule Information
  classTime: {
    type: String,
    required: true,
    enum: [
      'Mon & Wed - 4:00 PM Pacific',
      'Mon & Wed - 7:00 PM Pacific',
      'Tue & Thu - 4:00 PM Pacific',
      'Tue & Thu - 7:00 PM Pacific'
    ],
    trim: true
  },
  diagnosticTestDate: {
    type: String,
    required: true,
    enum: [
      'Saturday September 27th 8:30am - noon PST',
      'Sunday September 28th 8:30am - noon PST',
      'I can\'t make either of these dates (reply below with if neither option works for you)'
    ],
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
StudentSchema.index({ classTime: 1 }); // For enrollment counting

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
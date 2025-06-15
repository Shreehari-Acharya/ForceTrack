import mongoose, {Schema} from "mongoose";

const studentSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  codeforcesHandle: {
    type: String,
    required: true,
    unique: true,
  },
  currentRating: {
    type: Number,
    required: true,
  },
  maxRating: {
    type: Number,
    required: true,
  },

  lastSynced: {
    type: Date,
    default: () => new Date(0), 
  },

  inactivityReminderCount: {
    type: Number,
    default: 0,
  },

  disableInactivityEmail: {
    type: Boolean,
    default: false,
  },

  lastSubmissionDate: {
    type: Date,
    default: null, 
    index: true, 
  },
  
});

const Students = mongoose.model("Students", studentSchema);

export default Students;
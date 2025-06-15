import mongoose ,{ Schema } from "mongoose";

const studentProblemSolvedSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true,
    index: true, // for quick lookup
  },

  solvedDate: {
    type: Date,
    required: true,
    index: true, // for filtering by days
  },

  problemRating: {
    type: Number,
    required: true,
  }
});

const StudentProblemSolved = mongoose.model("StudentProblemSolved", studentProblemSolvedSchema);

export default StudentProblemSolved;
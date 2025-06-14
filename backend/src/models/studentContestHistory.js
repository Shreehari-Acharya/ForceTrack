import mongoose, {Schema} from "mongoose";

const studentContestHistorySchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true,
    index: true, // for quick lookup
  },
  contestId: Number,
  contestName: String,
  rank: Number,
  ratingChange: Number,
  newRating: Number,
  unsolvedCount: Number,
  date: {
    type: Date,
    required: true,
    index: true, // for filtering by days
  }
});

const StudentContestHistory = mongoose.model("StudentContestHistory", studentContestHistorySchema);

export default StudentContestHistory;
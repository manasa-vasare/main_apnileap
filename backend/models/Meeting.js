const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  campusId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  agenda: {
    type: String,
    required: true
  },
  cadenceType: {
    type: String,
    required: true,
    enum: [
      "Weekly College PM Update",
      "Weekly ApniLeap Cohort Checkpoint",
      "Bi-weekly Program Director Review",
      "Monthly FIP Steering Review",
      "General Sync"
    ],
    default: "General Sync"
  },
  meetingNotes: {
    type: String,
    default: ""
  },
  actionItems: [
    {
      summary: String,
      jiraKey: String,
      status: { type: String, default: "Created" },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  notesPostedAt: {
    type: Date,
    default: null
  },
  reminderSentAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Meeting", MeetingSchema);

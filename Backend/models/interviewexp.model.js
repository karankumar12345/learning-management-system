const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    replies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true });

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: false
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    tags: [String]
});

const interviewExperienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    experience: {
        type: String,
        required: true,
    },
    questions: [questionSchema],
    overallDifficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    result: {
        type: String,
        enum: ["Selected", "Rejected", "In Progress"],
        required: true
    },
    comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model("InterviewExperience", interviewExperienceSchema);

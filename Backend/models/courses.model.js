const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    questionReplies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            answer: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true });

// Like Schema
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

// Link Schema
const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

// Review Schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        default: "",
        required: true,
    },
    commentReplies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            reply: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

// Subtitle Schema
const subtitleSchema = new mongoose.Schema({
    subtitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    videoThumbnail: {
        type: String,
        required: true,
    },
    links: [linkSchema],
    reviews: [reviewSchema], // Referencing reviews
    comments: [commentSchema] // Referencing comments
}, { timestamps: true });

// Course Schema
const courseDataSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      },
      price: { 
        type: Number, 
        required: true 
      },
      estimatedPrice: { 
        type: Number 
      },
      thumbnail: {
        public_id: { 
          type: String, 
          required: true 
        },
        url: { 
          type: String, 
          required: true 
        }
      },
      tags: { 
        type: String, 
        required: true 
      },
      level: { 
        type: String, 
        required: true 
      },
      demoUrl: { 
        type: String, 
        required: true 
      },
      benefits: [{ 
        title: { 
          type: String, 
          required: true 
        } 
      }],
      prerequisites: [{ 
        title: { 
          type: String, 
          required: true 
        } 
      }],
    subtitles: [subtitleSchema], // Referencing subtitles
   
    likes: [likeSchema] // Referencing likes
}, { timestamps: true });


const Course = mongoose.model("Course", courseDataSchema);

module.exports = {  Course };

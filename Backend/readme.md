
Overview

This API allows users to share their interview experiences, provide feedback, add questions, and engage with other users through comments and reviews. It includes authentication, user roles, and course-related functionalities.

Features

User Authentication (JWT-based login/signup)

Role-based access control (User/Admin)

Add and retrieve interview experiences

Commenting and replying system

Feedback system

Course management (CRUD operations)

Like and review system for courses

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT (JSON Web Token)

Security: bcrypt for password hashing

Environment Variables: dotenv

Installation


# Express.js with Mongoose, Multer & dotenv Setup

This project sets up an **Express.js** server with **Mongoose** for MongoDB connection, **dotenv** for environment variables, and **Multer** for file uploads.

## Features
- Express.js server setup
- MongoDB connection using Mongoose
- Environment variable management with dotenv


## Create All file Structure of this project that 
- routes 
- controllers
- utils
- mail
- models
- middleware



## create a user model have a attribute
- name
- email 
- password 
- role 
- courses 
    - [{_id {
        type:string 
        required :true
    }}]




## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project folder:
   ```bash
   cd your-repo
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables (MongoDB connection, etc.).
5. Start the server:
   ```bash
   npm start
   ```


   # User Schema

This project defines a MongoDB schema for user authentication and management using Mongoose, JWT, and bcrypt.

## User Schema

```javascript
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      validate: {
        validator: (value) => emailRegix.test(value),
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your Password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    courses: [
      {
        _id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
```

## Methods

### Compare Password
```javascript
userSchema.methods.comparePassword = async function (enterPassword) {
  console.log("Comparing Entered Password:", enterPassword);
  console.log("With Stored Password:", this.password);
  return bcrypt.compareSync(enterPassword, this.password);
};
```

### Generate Access Token
```javascript
userSchema.methods.SignAccessToken = function () {
  const accessToken = jwt.sign(
    { id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return accessToken;
};
```

### Generate Refresh Token
```javascript
userSchema.methods.SignRefreshToken = function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );
  return refreshToken;
};
```

## API Endpoints

| Endpoint         | Method | Description             |
| --------------- | ------ | ----------------------- |
| `/users/signup` | `POST` | Register a new user     |
| `/users/login`  | `POST` | Log in a user           |
| `/users/me`     | `GET`  | Get user profile        |
| `/users/logout` | `POST` | Log out a user          |

## License

This project is open-source and available under the MIT License.

## Author

- **Your Name** - [GitHub Profile](https://github.com/your-profile)






# Course Schema

This project defines a MongoDB schema for an online course platform using Mongoose. It includes courses, subtitles, reviews, comments, likes, and links.


## Schemas

### Course Schema

```javascript
const courseDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    estimatedPrice: { type: Number },
    thumbnail: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    tags: { type: String, required: true },
    level: { type: String, required: true },
    demoUrl: { type: String, required: true },
    benefits: [{ title: { type: String, required: true } }],
    prerequisites: [{ title: { type: String, required: true } }],
    subtitles: [subtitleSchema],
    likes: [likeSchema]
}, { timestamps: true });
```

### Subtitle Schema

```javascript
const subtitleSchema = new mongoose.Schema({
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoThumbnail: { type: String, required: true },
    links: [linkSchema],
    reviews: [reviewSchema],
    comments: [commentSchema]
}, { timestamps: true });
```

### Review Schema

```javascript
const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
    comment: { type: String, required: true, default: "" },
    commentReplies: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        reply: { type: String, required: true }
    }]
}, { timestamps: true });
```

### Comment Schema

```javascript
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: String, required: true },
    questionReplies: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        answer: { type: String, required: true }
    }]
}, { timestamps: true });
```

### Like Schema

```javascript
const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
```

### Link Schema

```javascript
const linkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true }
});
```

## API Endpoints

| Endpoint               | Method   | Description               |
| ---------------------- | -------- | ------------------------- |
| `/courses`             | `GET`    | Fetch all courses         |
| `/courses/:id`         | `GET`    | Fetch a single course     |
| `/courses`             | `POST`   | Create a new course       |
| `/courses/:id`         | `PUT`    | Update an existing course |
| `/courses/:id`         | `DELETE` | Delete a course           |
| `/courses/:id/review`  | `POST`   | Add a review to a course  |
| `/courses/:id/comment` | `POST`   | Add a comment to a course |

## Example JSON Data

### Course Creation Example
```json
{
    "name": "Full-Stack Web Development",
    "description": "A complete course on MERN stack.",
    "price": 49.99,
    "estimatedPrice": 99.99,
    "thumbnail": {
        "public_id": "image123",
        "url": "https://example.com/image.jpg"
    },
    "tags": "MERN, JavaScript, Node.js",
    "level": "Beginner",
    "demoUrl": "https://example.com/demo",
    "benefits": [{ "title": "Hands-on Projects" }],
    "prerequisites": [{ "title": "Basic JavaScript" }],
    "subtitles": [],
    "likes": []
}
```

# Documentation Schema

This project defines a MongoDB schema for a technical documentation platform using Mongoose. It includes documentation, sections, comments, and upvotes.



## Schemas

### Documentation Schema

```javascript
const documentationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    sections: [sectionSchema],
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    upvotes: { type: Number, default: 0 },
    comments: [commentSchema],
}, { timestamps: true });
```

### Section Schema

```javascript
const sectionSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    content: { type: String, required: true },
    examples: { type: String, required: true },
    references: { type: String }
});
```

### Comment Schema

```javascript
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
}, { timestamps: true });
```

## API Endpoints

| Endpoint                | Method   | Description                      |
| ----------------------- | -------- | -------------------------------- |
| `/docs`                 | `GET`    | Fetch all documentation entries |
| `/docs/:id`             | `GET`    | Fetch a single documentation    |
| `/docs`                 | `POST`   | Create a new documentation      |
| `/docs/:id`             | `PUT`    | Update an existing documentation |
| `/docs/:id`             | `DELETE` | Delete a documentation entry    |
| `/docs/:id/comment`     | `POST`   | Add a comment to documentation  |

## License

This project is open-source and available under the MIT License.

## Author

- **Your Name** - [GitHub Profile](https://github.com/your-profile)




# Feedback Schema

This project defines a MongoDB schema for a user feedback system using Mongoose. It includes feedback messages, job types, avatars, and timestamps.


## Schema

### Feedback Schema

```javascript
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jobtypes: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
```

## API Endpoints

| Endpoint           | Method   | Description               |
| ------------------ | -------- | ------------------------- |
| `/feedbacks`      | `GET`    | Fetch all feedbacks       |
| `/feedbacks/:id`  | `GET`    | Fetch a single feedback   |
| `/feedbacks`      | `POST`   | Create a new feedback     |
| `/feedbacks/:id`  | `PUT`    | Update an existing feedback |
| `/feedbacks/:id`  | `DELETE` | Delete a feedback         |

## License

This project is open-source and available under the MIT License.

## Author

- **Your Name** - [GitHub Profile](https://github.com/your-profile)

# Interview Experience Schema

This project defines a MongoDB schema for storing interview experiences, including user feedback, company details, interview questions, and comments.



## Schema

### Interview Experience Schema

```javascript
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
```

## API Endpoints

| Endpoint                        | Method   | Description                          |
| -------------------------------- | -------- | ------------------------------------ |
| `/interview-experiences`        | `GET`    | Fetch all interview experiences     |
| `/interview-experiences/:id`    | `GET`    | Fetch a single interview experience |
| `/interview-experiences`        | `POST`   | Create a new interview experience   |
| `/interview-experiences/:id`    | `PUT`    | Update an existing experience       |
| `/interview-experiences/:id`    | `DELETE` | Delete an interview experience      |

## License

This project is open-source and available under the MIT License.

## Author

- **Your Name** - [GitHub Profile](https://github.com/your-profile)



## License

This project is open-source and available under the MIT License.

## Author

- **Your Name** - [GitHub Profile](https://github.com/your-profile)


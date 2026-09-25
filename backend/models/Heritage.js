const mongoose = require('mongoose');

const heritageSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  historicalPeriod: { 
    type: String 
  },
  // The actual educational reading material
  lessonContent: { 
    type: String, 
    required: true 
  },
  // An embedded array of quiz questions specific to this site
  quiz: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true }
    }
  ],
  // This links the site to the specific Teacher who uploaded it
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Heritage', heritageSchema);
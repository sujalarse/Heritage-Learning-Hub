const mongoose = require('mongoose');
require('dotenv').config();
const Heritage = require('./models/Heritage');

const sampleSites = [
  {
    title: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    description: "An ivory-white marble mausoleum on the right bank of the river Yamuna.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
    historicalPeriod: "Mughal Empire (1632–1653)",
    lessonContent: "The Taj Mahal was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. It is widely considered one of the most beautiful buildings ever created and stands as a symbol of eternal love. The architecture combines Indian, Persian, and Islamic influences.",
    quiz: [
      {
        question: "Who commissioned the building of the Taj Mahal?",
        options: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
        correctAnswer: "Shah Jahan"
      },
      {
        question: "In what city is the Taj Mahal located?",
        options: ["New Delhi", "Agra", "Jaipur", "Mumbai"],
        correctAnswer: "Agra"
      }
    ]
  },
  {
    title: "Ajanta Caves",
    location: "Aurangabad District, Maharashtra",
    description: "Approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.",
    imageUrl: "https://placehold.co/800x500/92400e/ffffff?text=Ajanta+Caves",
    historicalPeriod: "Satavahana and Vakataka Dynasties",
    lessonContent: "The Ajanta Caves are universally regarded as masterpieces of Buddhist religious art. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art, particularly expressive paintings that present emotion through gesture, pose and form.",
    quiz: [
      {
        question: "The Ajanta Caves are primarily associated with which religion?",
        options: ["Hinduism", "Jainism", "Buddhism", "Sikhism"],
        correctAnswer: "Buddhism"
      }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(async () => {
    console.log('Connected to database. Planting seeds...');
    
    // Clear out any existing sites to prevent duplicates
    await Heritage.deleteMany({});
    
    // Insert the new sites
    await Heritage.insertMany(sampleSites);
    
    console.log('Database successfully seeded with heritage sites!');
    process.exit(); // Close the script
  })
  .catch(err => {
    console.log('Seed error:', err);
    process.exit(1);
  });
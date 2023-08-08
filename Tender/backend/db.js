

const mongoose = require('mongoose');

const uri = 'mongodb+srv://NM116:12345678nm@cluster0.sbihjn6.mongodb.net/TenderAddis?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });

    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas', error);
    throw error;
  }
};

module.exports = { mongoose, connectToMongoDB };
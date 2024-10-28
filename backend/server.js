const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tender = require('./Model/Tender');
const User = require('./Model/User');

const app = express();

app.use(cors());
app.use(express.json());

// Define the route handler for adding a tender
app.post('/api/tenders', async (req, res) => {
  console.log('Received request to add tender:', req.body);
  try {
    const { title, description, closingDate, budget, status, type } = req.body;

    // Validate the tender data (e.g., check required fields, data types)
    if (!title || !description || !closingDate || !budget || !status || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new tender document using the Tender model
    const newTender = new Tender({
      title,
      description,
      closingDate,
      budget,
      status,
      type,
    });

    // Save the new tender document to the database
    await newTender.save();

    // Return the newly added tender as the API response
    res.status(201).json(newTender);
  } catch (error) {
    console.error('Error adding tender:', error);
    res.status(500).json({ error: 'Failed to add tender' });
  }
});

// Define a route for searching tenders based on the title
app.get('/api/tenders', async (req, res) => {
  try {
    const searchTerm = req.query.title;
    const matchingTenders = await Tender.find({
      title: { $regex: searchTerm, $options: 'i' },
    });
    res.json(matchingTenders);
  } catch (error) {
    console.error('Error searching tenders:', error);
    res.status(500).json({ error: 'Failed to search tenders' });
  }
});

// Define a route for fetching free tenders
app.get('/api/freetenders', async (req, res) => {
  try {
    const freeTenders = await Tender.find({ type: 'FREE' });
    res.json(freeTenders);
  } catch (error) {
    console.error('Error fetching free tenders:', error);
    res.status(500).json({ error: 'Failed to fetch free tenders' });
  }
});

// Define a route for fetching paid tenders
app.get('/api/paidtenders', async (req, res) => {
  try {
    const paidTenders = await Tender.find({ type: 'PAID' });
    res.json(paidTenders);
  } catch (error) {
    console.error('Error fetching paid tenders:', error);
    res.status(500).json({ error: 'Failed to fetch paid tenders' });
  }
});

// Define the route handler for deleting a tender
app.delete('/api/tenders/:id', async (req, res) => {
  try {
    const tenderId = req.params.id;

    // Find the tender by ID and delete it
    await Tender.findByIdAndDelete(tenderId);

    // Return a success message
    res.json({ message: 'Tender deleted successfully' });
  } catch (error) {
    console.error('Error deleting tender:', error);
    res.status(500).json({ error: 'Failed to delete tender' });
  }
});

const startServer = async () => {
  try {
    // Connect to the database
    await connectToMongoDB();

    // Start the server after successfully connecting to the database
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name, mobile } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document using the User model
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      mobile
    });

    // Save the new user document to the database
    await newUser.save();

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: newUser._id }, '911731690');

    // Return the newly registered user and the JWT token as the API response
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error:'Failed to register user' });
  }
});

// Define the route handler for user login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, '911731690');

    // Return the authenticated user and the JWT token as the API response
    res.json({ user, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to login user' });
  }
});

startServer();
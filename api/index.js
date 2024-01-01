const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose.
  connect("mongodb+srv://lucasferndias:vilFGKgX5kOp8RXE@cluster0.feup4b5.mongodb.net/")
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((err) => {
    console.log('Error connecting to mongodb', err);
  });

  app.listen(port, () => {
    console.log('Server is runinng on http://localhost:8000')
  });


  // models
  const User = require('./models/user');
  const Order = require('./models/order');


  // func to send verification email to the user
  const sendVerificationEmail = async (email, verificationToken) => {
    // crete a nodemailer transport
    const transporter = nodemailer.createTransport({
      // config the email service
      service: 'gmail',
      auth: {
        user: 'ecommercetanamao@gmail.com',
        pass: 'lepd pvyr ionp hgyh'
      }
    });

    // compose the email message
    const mailOptions = {
      from: 'amazon.com',
      to: email,
      subject: "Email verification",
      text: `Please click the following link to verify your email: http://localhost:${port}/verify/${verificationToken}`
    };

    // send the email
    try {
      await transporter.sendMail(mailOptions);

    } catch (error) {
      console.log("Error sending verification email", error);
    }
  }


  // endpoint to register in the app
  app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Email already registered:", email); // Debugging statement
        return res.status(400).json({ message: "Email already registered" });
      }
  
      // Create a new user
      const newUser = new User({ name, email, password });
  
      // Generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");
  
      // Save the user to the database
      await newUser.save();
  
      // Debugging statement to verify data
      console.log("New User Registered:", newUser);
  
      // Send verification email to the user
      // Use your preferred email service or library to send the email
      sendVerificationEmail(newUser.email, newUser.verificationToken);
  
      res.status(201).json({
        message:
          "Registration successful. Please check your email for verification.",
      });
    } catch (error) {
      console.log("Error during registration:", error); // Debugging statement
      res.status(500).json({ message: "Registration failed" });
    }
  });
  

  // endpoint to verify the email
  app.get('/verify/:token', async (req, res) => {
    try {
      
      const token = req.params.token;

      // find the user with the given verification token
      const user = await User.findOne({ verificationToken: token });
      if(!user) {
        return res.status(404).json({message: 'Invalid verification token'});
      }

      // Mark the user as verified
      user.verified = true;
      user.verificationToken = undefined;

      await user.save();

      res.status(200).json({message: 'Email verified successfully'});

    } catch (error) {
      res.status(500).json({message: 'Email verification failed'});
    }
  });


  const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
  
    return secretKey;
  };
  
  const secretKey = generateSecretKey();

  // endpoint to login the user
  app.post("/login", async(req, res) => {
    try {
      const { email, password } = req.body;

      // check if the user exists
      const user = await User.findOne({ email});
      if(!user) {
        return res.status(401).json({message: 'Invalid email or password'})
      }

      // check if the password is correct
      if(user.password !== password) {
        return res.status(401).json({message: 'Invalid password'});
      } 

      // generate  token
      const token = jwt.sign({ userId: user._id}, secretKey)

      res.status(200).json({token});

    } catch (error) {
       res.status(500).json({message: 'Login failed'});
    }
  });

  // endpoint to store a new address to the backend
  app.post('/addresses', async(req, res) => {
    try {
      const { userId, address } = req.body;

      // find the user by the UserId
      const user = await User.findById(userId);
      if(!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      //add the new address to the user's addresses array
      user.addresses.push(address);

      // save the updated addresses to the backend
      await user.save();

      res.status(200).json({ message: 'Address created successfully'});

    } catch (error) {
      res.status(500).json({ message: 'Error adding address'});
    }
  });

  app.get('/addresses/:userId', async(req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if(!user) {
        return res.status(404).json({message: 'User not found'});
      }

      const addresses = user.addresses;
      res.status(200).json({addresses});
    } catch (error) {
      res.status(500).json({ message: 'Error retrieveing the addresses'});
    }
  });
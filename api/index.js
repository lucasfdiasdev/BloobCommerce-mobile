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
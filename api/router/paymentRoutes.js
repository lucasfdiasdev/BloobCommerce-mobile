const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');
dotenv.config();

const stripe = new Stripe(
  process.env.STRIPE_API_KEY_PUBLIC
)

module.exports = router;
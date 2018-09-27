require('dotenv').config(); // loads the .env
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passportConfig = require('./config/passportConfig');
const app = express();

app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport. Use passport.session() middleware to support persistent login sessions.
app.use(passportConfig.initialize());
app.use(passportConfig.session());

app.use('/facebook', require('./routes/facebook'));
app.use('/quotes', require('./routes/quotes'));
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT || 3001);
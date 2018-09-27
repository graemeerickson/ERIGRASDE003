const express = require('express');
const GoodreadsStrategy = require('passport-goodreads').Strategy;
const passport = require('../config/passportConfig');
const router = express.Router();

const FRONTEND_URL = 'http://localhost:3000';
const QUOTES_PATH = '/quotes';

router.get('/', passport.authenticate('goodreads', {
    session: true,
    successRedirect: FRONTEND_URL + QUOTES_PATH,
    failureRedirect: FRONTEND_URL + QUOTES_PATH
  })
);

router.get('/callback', passport.authenticate('goodreads', { failureRedirect: FRONTEND_URL + '/quotes' }),
  function(req, res) {
    res.redirect(FRONTEND_URL + QUOTES+PATH + '/' + req.query.authorize);
  }
);

module.exports = router;
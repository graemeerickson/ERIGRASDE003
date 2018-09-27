const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hit /auth GET route');
});

module.exports = router;
const express = require('express');
const fs = require('fs');
const {PythonShell} = require('python-shell');
const router = express.Router();

const fbPostsFile = './scripts/expedia_fb_posts.txt';
const pythonScript = './scripts/expedia_fb_posts.py';

router.get('/', (req, res) => {
  // Execute facebook posts Python script, then read the resulting file into a local data structure.
  // Send data back to frontend to display on the UI.
  PythonShell.run(pythonScript, null, (err) => {
    if (err) console.log('error:', err);
    const postsArr = fs.readFileSync(fbPostsFile, 'utf8');
    res.send(JSON.parse(postsArr));
  })
})

module.exports = router;
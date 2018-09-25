const express = require('express');
const app = express();

app.use('/facebook', require('./routes/facebook'));

app.listen(process.env.PORT || 3001);
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors())

app.use('/facebook', require('./routes/facebook'));
app.use('/quotes', require('./routes/quotes'));
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT || 3001);
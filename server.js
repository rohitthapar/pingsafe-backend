const express = require('express');

const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const wordcheck = require('./controller/existInDictionary')
const generateBoard = require('./controller/generateBoard')
const validateWord = require('./controller/validateWord')
// Define a route

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', wordcheck);
app.use('/api', generateBoard);
app.use('/api', validateWord);
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

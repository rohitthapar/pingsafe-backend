const express = require('express');

const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const createGame = require('./controller/createGame')
const playGame = require('./controller/playGame')
const showGame = require('./controller/showGame')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', createGame);
app.use('/api', playGame);
app.use('/api', showGame);
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const createGame = require('./controller/createGame.js');
const playGame = require('./controller/playGame.js');
const showGame = require('./controller/showGame.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', createGame);
app.use('/api', playGame);
app.use('/api', showGame);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

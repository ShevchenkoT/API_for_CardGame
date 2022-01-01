const express = require('express');
const app = express();

const { PORT } = require('../../environment.config');

const port = process.env.PORT || PORT;

const { getAllRecords, setOneRecord } = require('../../database/mongoDB');
// requests setting
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// start page
app.get('/', (req, res) => {
  res.send('<h1>Game Card API</h2>');
});

// start server
app.listen(port, () => {
  console.log('Server started...');
});

// get request
app.get('/records', getAllRecords);

// parse data from post request
app.use(express.json());
// post request
app.post('/records', setOneRecord);

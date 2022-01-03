const { PORT } = require('../../environment.config');

const port = process.env.PORT || PORT;

const { getAllRecords, setOneRecord } = require('../../database/mongoDB');

const app = require('../app');
// requests setting

// start server
app.listen(port, () => {
  console.log('Server started...');
});

// start page
app.get('/', (req, res) => {
  res.send('<h1>Game Card API</h2>');
});

// get request
app.get('/records', getAllRecords);

// post request
app.post('/records', setOneRecord);

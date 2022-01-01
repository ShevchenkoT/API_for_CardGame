const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { PORT, MONGODB_URL } = require('../../environment.config');

const port = process.env.PORT || PORT;

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

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDb connected...'))
  .catch((e) => console.log(e));

// start page
app.get('/', (req, res) => {
  res.send('<h1>Game Card API</h2>');
});

// start server
app.listen(port, () => {
  console.log('Server started...');
});

const RecordSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  numberOfCard: {
    type: Number,
    required: true
  },
  cardType: {
    type: String,
    required: true
  },
  steps: {
    type: Number,
    required: false
  },
  time: {
    type: Number,
    required: false
  },
  date: {
    type: Date,
    required: false
  }
});
const Users = mongoose.model('record', RecordSchema);

// get request
app.get('/records', (req, res) => {
  Users.find((err, records) => {
    res.json(records);
    console.log('Get Records');
  });
});

// parse data from post request
app.use(express.json());
// post request
app.post('/records', ({ body }, res) => {
  const newRecord = {
    ...body
  };

  Users.create(newRecord)
    .then(() => {
      res.json(newRecord);
    })
    .catch(() => {
      res.status(400).json({ error: 'Data type is wrong' });
    });

  console.log('Add record');
});
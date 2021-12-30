const express = require('express');
const app = express();
const url =
  'mongodb+srv://taras:werty123@cluster0.4uh3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; // your MongoDB url
const mongoose = require('mongoose');

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
  .connect(url, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDb connected...'))
  .catch((e) => console.log(e));

app.listen(3000, () => {
  console.log('Server started...');
});

const RecordSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
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
  });
  console.log('Get Records');
});

// parse data from post request
app.use(express.json());
// post request
app.post('/records', ({ body }, res) => {
  const id = idGenerator();

  const newRecord = {
    ...body,
    id
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

function idGenerator() {
  return `-${Math.random().toString(16).slice(2)}`;
}

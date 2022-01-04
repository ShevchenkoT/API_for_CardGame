const mongoose = require('mongoose');
const Record = require('./schema/records');
const { MONGODB_URL } = require('../environment.config');

// connect to database
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDb connected...'))
  .catch((e) => console.log(e));

// create mongo model
const Records = mongoose.model('record', Record);

// get all data from database
const getAllRecords = (req, res) => {
  Records.find(async (err, records) => {
    await res.json(records);
    console.log('Get Records');
  });
};

// set data to database
const setOneRecord = async ({ body }, res) => {
  const newRecord = {
    ...body
  };

  await Records.create(newRecord)
    .then(() => {
      res.json(newRecord);
    })
    .catch(() => {
      res.status(400).json({ error: 'Data type is wrong' });
    });

  console.log('Add record');
};

module.exports = { getAllRecords, setOneRecord };

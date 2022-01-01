require('dotenv').config();

const { PORT, MONGODB_URL } = process.env;

//export default { PORT, MONGODB_URL };

module.exports = { PORT, MONGODB_URL };

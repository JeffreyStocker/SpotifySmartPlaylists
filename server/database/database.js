const mongoose = require ('mongoose');

const mongoDBURL = process.env.MONGO_DB_URL;

mongoose.connect(mongoDBURL, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log ('Database connected')
});
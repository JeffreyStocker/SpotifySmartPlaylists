const mongoose = require ('mongoose');

const usersSchema = mongoose.Schema({
  name: String,
  accessToken: String,
  refreshToken: String,
})

const Users = mongoose.model('users', usersSchema);

const createUser = function (name) {
  const user = new Users({name}).save((err, results) => {
    console.log (err, results)
  });
}

const getUser = function (name) {
  return new Promise ((resolve, revoke) => {
    Users.findOne({name}).exec()
    .then(resolve)
    .catch(revoke)
  })
}

module.exports = {
  model: Users,
  createUser,
  getUser
};
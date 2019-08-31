const mongoose = require ('mongoose');
const Playlists = require ('./playlists');
const {getRefreshToken} = require ('../spotify/authorize')

const usersSchema = mongoose.Schema({
  accessToken: String,
  id: {
    type: String,
    isRequired: true
  },
  name: String,
  refreshToken: String,
  smartPlaylists: {
    type: [Playlists.schema],
    default: [],
    required: false
  },
  updated: {
    default: new Date(),
    type: Date
  }
})

const Users = mongoose.model('users', usersSchema);

const createUser = async function (name) {
  const user = new Users(name);
  return user.save();
}

const getUser = async function (searchParams) {
  return Users.findOne(searchParams)
    .exec()
}

const createOrUpdateUser = function createOrUpdateUser (dataToSave) {
  return Users.findOneAndUpdate({id: dataToSave.id}, dataToSave, {
    useFindAndModify: false,
    upsert: true,
    new: true
  })
    .exec()
}

/**
 *
 * @param {String} accessToken
 * @description will get a new token from spotify and then save the token and access token to the user database
 * @returns {String} new access token
 */
const getAndUpdateRefreshToken = async function (accessToken) {
  const query = {accessToken: accessToken};
  const doc = await Users.findOne(query).exec();
  const {access_token, refresh_token} = await refreshToken(doc.refresh_token);
  await Users.updateOne(query, {access_token, refresh_token}).exec();
  return access_token;
}

module.exports = {
  model: Users,
  createOrUpdateUser,
  createUser,
  getUser,
  getAndUpdateRefreshToken,
};

//example profile return data
/*
{
  "country":"SE",
  "display_name":"JM Wizzler",
  "email":"email@example.com",
  "external_urls":{"spotify":"https://open.spotify.com/user/wizzler"},
  "followers":{
    "href":null,
    "total":3829
  },
  "href":"https://api.spotify.com/v1/users/wizzler",
  "id":"wizzler",
  "images":[
    {"height":null,"url":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg","width":null}
  ],
  "product":"premium",
  "type":"user",
  "uri":"spotify:user:wizzler"
}
*/
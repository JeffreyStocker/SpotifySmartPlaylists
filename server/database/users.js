const mongoose = require ('mongoose');
const Playlists = require ('./playlists');
const {getRefreshToken} = require ('../spotify/authorize')

const usersSchema = mongoose.Schema({
  accessToken: String,
  id: {
    type: String,
    isRequired: true,
    unique: true
  },
  name: String,
  refreshToken: String,
  smartPlaylists: {
    type: [Playlists.schema],
    default: [],
    required: false
  },
  updatedAccessToken: Date,
  updated: {
    default: new Date(),
    type: Date
  },
  refreshTokenExpires: {
    type: Number,
    required: true
  }
})

/**
 * @description Determines if the access token is expired
 * @this {Users} A user Schema for a found user
 * @returns Boolean
 */
usersSchema.method('isExpired', function () {
  const {refreshTokenExpires, updatedAccessToken} = this;
  const dateDiff = Date.now() - updatedAccessToken;
  const expirationTimeInMS = refreshTokenExpires * 1000
  const marginOfError = 10000
  if ( dateDiff > (expirationTimeInMS - marginOfError)) {
    return true;
  } else {
    return false;
  }
})

/**
 *
 * @this {Users} A user Schema for a found user
 * @return {null||String} null if error, access token upon retrival from spotify
 */
usersSchema.method('updateToken', async function () {
  const response = await getRefreshToken(this.refreshToken);
  if (response && response.access_token) {
    this.accessToken = response.access_token;
    this.refreshTokenExpires = response.expires_in;
    this.updatedAccessToken = Date.now();
    await this.save();
    return this.accessToken;
  }
  return null;
})

/**
 * @this {Users} A user model of a found user
 * @returns {null|String} A Access Token for Spotify or failure will return null
 */
usersSchema.method('checkAccessTokenIsExpiredAndUpdate', async function () {
  let accessToken;
  const isExpired = this.isExpired();
  accessToken = (isExpired) ? await this.updateToken() : this.accessToken;

  return accessToken;
})

/**
 * Middleware, keeps updated whenever saving
 *
 * @param {function} next calls the next middleware
 *
 */
const updateDate = function updateDate (next) {
  this.updated = Date.now()
  next();
}

/**
 * @description keeps updated updated when update is called
 */
usersSchema.pre('update', updateDate)

/**
* @description keeps updated updated when findOneAndUpdate is called
*/
usersSchema.pre('findOneAndUpdate', updateDate)

/**
 * @description keeps updated updated when save is called
 */
usersSchema.pre('save', updateDate)


const createUser = async function (name) {
  const now = new Date();
  Object.assign(name, {
    updatedAccessToken: now
  })

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
const getAndUpdateRefreshTokenByToken = async function (accessToken) {
  const query = {accessToken: accessToken};
  const doc = await Users.findOne(query).exec();
  const {access_token, expires_in} = await getRefreshToken(doc.refreshToken);
  const now = new Date();

  doc.refreshTokenExpires = expires_in;
  doc.accessToken = access_token;
  doc.updated = now
  doc.updatedAccessToken = now

  await doc.save()
    .then(results => {
      console.log (results)
    })

  return access_token;
}



const Users = mongoose.model('users', usersSchema);

module.exports = {
  model: Users,
  createOrUpdateUser,
  createUser,
  getUser,
  getAndUpdateRefreshTokenByToken,
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
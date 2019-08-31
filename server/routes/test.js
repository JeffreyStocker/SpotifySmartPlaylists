const koaRouter = require ('koa-router');
const tracks = require ('../spotify/tracks');
const dbUser = require ('../database/users');
const userData = require ('../spotify/userData');
const {getLikedSongs, getLikedAlbums} = require ('../spotify/library');

const route = new koaRouter();

route.get('/test', async (ctx) => {
  const id = ctx.query.id;
  const userData = await dbUser.getUser({id});
  let {accessToken} = userData;

  if (userData.isExpired()) {
    accessToken = await dbUser.getAndUpdateRefreshToken(accessToken)
  }

  const retrievedTracks = await getLikedSongs(accessToken);
  const retrievedAlbums = await getLikedAlbums(accessToken);
  ctx.body = {tracks: retrievedTracks, albums: retrievedAlbums};
  return
})

module.exports = route;
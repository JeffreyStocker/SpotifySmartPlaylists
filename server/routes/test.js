const koaRouter = require ('koa-router');
const tracks = require ('../spotify/tracks');
const dbUser = require ('../database/users');
const userData = require ('../spotify/userData');
const {getLikedSongs, getLikedAlbums} = require ('../spotify/library');

const route = new koaRouter();

route.get('/test', async (ctx) => {
  const id = ctx.query.id;
  const userData = await dbUser.getUser({id});
  const retrievedTracks = await getLikedSongs(userData.accessToken);
  const retrievedAlbums = await getLikedAlbums(userData.accessToken);
  ctx.body = {tracks: retrievedTracks, albums: retrievedAlbums};
  return
})

module.exports = route;
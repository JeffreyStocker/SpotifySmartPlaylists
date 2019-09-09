const koaRouter = require ('@koa/router');
const tracks = require ('../spotify/tracks');
const dbUser = require ('../database/users');
const userData = require ('../spotify/userData');
const {getLikedSongs, getLikedAlbums} = require ('../spotify/library');
const {getAllIdsFromAlbums, getAlbums, getAlbum, getArtistIdsFromAlbums} = require ('../spotify/albums');
const {getAllAlbumsIdsFromTracks, getArtistIdsFromTracks} = require ('../spotify/tracks');
const {getArtists} = require ('../spotify/artists');


const route = new koaRouter();

route.get('/test', async (ctx) => {
  console.time('test');
  const id = ctx.query.id;
  const userData = await dbUser.getUser({id});
  let {accessToken} = userData;

  if (userData.isExpired()) {
    accessToken = await dbUser.getAndUpdateRefreshTokenByToken(accessToken)
  }
  const [likedTracks, likedAlbums] = await Promise.all([getLikedSongs(accessToken), getLikedAlbums(accessToken)]);

  const artistsIds = await Promise.all([getArtistIdsFromAlbums(likedAlbums), getArtistIdsFromTracks(likedTracks)]);
  const nonReplicaArtistsIds = Array.from(new Set([...artistsIds[0], ...artistsIds[1]]))

  const artistData = await getArtists(accessToken, nonReplicaArtistsIds)
  console.timeEnd('test')
  ctx.body = {likedTracks: likedTracks, likedAlbums: likedAlbums, artists: artistData};
  return
})

module.exports = route;
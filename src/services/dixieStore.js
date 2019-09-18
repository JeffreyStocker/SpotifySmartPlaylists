import dexie from 'dexie';

const db = new dexie('spotify')

db.version(1).stores({
  artists: '&id, genre',
  tracks: '&id, *artists.id',
  albums: '&id, *tracks.id',
  playlists: '&id',
});

// export const artistsDB = new dexie('artist');
// export const tracksDB = new dexie('tracks');
// export const playlistsDB = new dexie('playlists');

// artistsDB.version(1).stores({
//   artist: "&id, *genre"
// })



// export default {
//   tracksDB,
//   artistsDB,
//   playlistsDB
// };

export default db;
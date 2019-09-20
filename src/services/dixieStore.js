import dexie from 'dexie';

const db = new dexie('spotify')

db.version(1).stores({
  artists: '&id, genre',
  tracks: '&id, *artists.id',
  albums: '&id, *tracks.id',
  playlists: '&id',
});

export default db;
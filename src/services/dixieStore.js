import dexie from 'dexie';

const db = new dexie('spotify')

db.version(1).stores({
  artists: '&id, name, *genre, popularity, followers.total',
  tracks: '&id, name, *artists.id, popularity',
  albums: '&id, name, label, album_type, *tracks.id, popularity, total_tracks',
  playlists: '&id, name, followers.total',
});

export default db;

export function filterArtists (callback) {
  return db.artists.filter((artist) => {
    return callback(artist)
  }).toArray();
}

window.db = db;
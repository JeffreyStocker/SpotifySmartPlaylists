export default dropdownOptions = [
  ['Artists Name', conditions.text, () => checkPromise(dexieDB.artists.orderBy('name').uniqueKeys())],
  ['Artist Popularity', conditions.number, () => Promise.resolve([])],
  ['Artist Followers', conditions.number, () => Promise.resolve([])],
  ['Artist Genre', conditions.text, () => checkPromise(dexieDB.artists.orderBy('genre').uniqueKeys())],
  ['Album Name', conditions.text, () => checkPromise(dexieDB.albums.orderBy('name').uniqueKeys())],
  ['Album Type', conditions.booleanText, () => checkPromise(dexieDB.artists.orderBy('album_type').uniqueKeys())],
  ['Album Release Date', conditions.number, () => Promise.resolve([])],
  ['Album Total Tracks', conditions.number, () => Promise.resolve([])],
  ['Album Popularity', conditions.number, () => Promise.resolve([])],
  ['Album Label', conditions.number, () => checkPromise(dexieDB.artists.orderBy('label').uniqueKeys())],
  ['Number of Tracks in Album', conditions.number, () => Promise.resolve([])],
  ['Track Name', conditions.text, () => checkPromise(dexieDB.tracks.orderBy('name').uniqueKeys())],
  ['Track Length', conditions.number, () => Promise.resolve([])],
  ['Disc Number', conditions.number, () => Promise.resolve([])],
  ['Track Number', conditions.number, () => Promise.resolve([])],
  ['Explicit', conditions.booleanText, () => Promise.resolve([true, false])],
  ['Track Popularity', conditions.number, () => Promise.resolve([])],
  ['Date Added', conditions.number, () => Promise.resolve([])],
  ['Playlist Followers', conditions.number, () => Promise.resolve([])],
  ['Playlist is Public', conditions.boolean, () => Promise.resolve([])],
  ['Playlist Owner', conditions.text, () => Promise.resolve([])],
  ['Playlist is Collaborative', conditions.boolean, () => Promise.resolve([])],
];

// ['Track Genre', conditions.text, () => {}, //have to implement with a different db than spotify
// ['Album Genre', conditions.text, () => {}], //have to implement with a different db than spotify
import dexieDB from '../services/dixieStore';

const databases = {

}

export const conditions = {
  number: ['greater than', 'less than', 'equal to', 'greater or equal than', 'less or equal than', 'is between'],
  text: ['includes', 'does not include', 'is', 'is not', 'starts with', 'ends with'],
  booleanText: ['is', 'is not'],
  boolean: ['is true', 'is not true']
};

const searchConditions = function (mod, target, source) {
  var isTrueOrFalse, searchTerm;

  switch (mod) {
  case 'greater than':
    isTrueOrFalse = target > source;
    break;
  case 'less than':
    isTrueOrFalse = target < source;
    break;
  case 'equal to':
    isTrueOrFalse = target == source;
    break;
  case 'greater or equal than':
    isTrueOrFalse = target >= source;
    break;
  case 'less or equal than':
    isTrueOrFalse = target <= source;
    break;
  case 'is between':
    let [low, high] = target;
    isTrueOrFalse = target > low && target < high;
    break;
  case 'includes':
    searchTerm = new RegExp(source);
    isTrueOrFalse = [('' + target).search(searchTerm) !== -1, {or: true}];
    break;
  case 'does not include':
    searchTerm = new RegExp(source);
    isTrueOrFalse = ('' + target).search(searchTerm) === -1;
    break;
  case 'is':
    isTrueOrFalse = target == source;
    break;
  case 'is not':
    isTrueOrFalse = target != source;
    break;
  case 'starts with':
    isTrueOrFalse = ('' + target).startsWith(source);
    break;
  case 'end with':
    isTrueOrFalse = ('' + target).endsWith(source);
    break;
  case 'is':
    isTrueOrFalse = target === source;
    break;
  case 'is not':
    isTrueOrFalse = target !== source;
    break;
  case 'is true':
    isTrueOrFalse = target == true;
    break;
  case 'is not true':
    isTrueOrFalse = target != false;
    break;
  }

  // console.log (mod, target, source, isTrueOrFalse)
  return isTrueOrFalse;
};

export const dropdownOptions = {
  'Artist Name': {
    conditions: conditions.text,
    data: () => checkPromise(dexieDB.artists.orderBy('name').uniqueKeys()),
    filter: (artist, source, mod) => searchConditions(mod, artist.name, source),
    dbName: 'artists'
  },
  'Artist Popularity': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (artist, source, mod) => searchConditions(mod, artist.popularity, source),
    dbName: 'artists'
  },
  'Artist Followers': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (artist, source, mod) => searchConditions(mod, (artist.followers && artist.followers) || 0, source),
    dbName: 'artists'
  },
  'Artist Genre': {
    conditions: conditions.text,
    data: () => checkPromise(dexieDB.artists.orderBy('genre').uniqueKeys()),
    filter: (artist, source, mod) => {
      return artist.genres.reduce ((found, genre) => {
        if (found || searchConditions(mod, genre, source)) {
          return true;
        }
        return false;
      }, false);
    },
    dbName: 'artists'
  },
  'Album Name': {
    conditions: conditions.text,
    data: () => checkPromise(dexieDB.albums.orderBy('name').uniqueKeys()),
    filter: (artist, source, mod) => searchConditions(mod, artist.name, source),
    dbName: 'albums'
  },
  'Album Type': {
    conditions: conditions.booleanText,
    data: () => checkPromise(dexieDB.artists.orderBy('album_type').uniqueKeys()),
    filter: (artist, source, mod) => searchConditions(mod, artist.album_type, source),
    dbName: 'albums'
  },
  'Album Release Date': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (album, source, mod) => searchConditions(mod, album.release_date, source),
    dbName: 'albums'
  },
  'Album Total Tracks': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (album, source, mod) => searchConditions(mod, album.total_tracks, source),
    dbName: 'albums'
  },
  'Album Popularity': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (album, source, mod) => searchConditions(mod, album.popularity, source),
    dbName: 'albums'
  },
  'Album Label': {
    conditions: conditions.number,
    data: () => checkPromise(dexieDB.albums.orderBy('label').uniqueKeys()),
    filter: (album, source, mod) => searchConditions(mod, album.label, source),
    dbName: 'albums'
  },
  // 'Number of Tracks in Album': { conditions: conditions.number, data: () => Promise.resolve([]),
  //   filter: (album, mod, source) => searchConditions(mod, album.total_tracks, source)
  // },
  'Track Name': {
    conditions: conditions.text,
    data: () => checkPromise(dexieDB.tracks.orderBy('name').uniqueKeys()),
    filter: (track, source, mod) => searchConditions(mod, track.name, source),
    dbName: 'tracks'
  },
  'Track Length': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (track, source, mod) => searchConditions(mod, track.duration_ms, source),
    dbName: 'tracks'
  },
  'Disc Number': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (track, source, mod) => searchConditions(mod, track.disc_number, source),
    dbName: 'tracks'
  },
  'Track Number': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (track, source, mod) => searchConditions(mod, track.name, source),
    dbName: 'tracks'
  },
  'Explicit': {
    conditions: conditions.booleanText,
    data: () => Promise.resolve([true, false]),
    filter: (track, source, mod) => searchConditions(mod, track.explicit, source),
    dbName: 'tracks'
  },
  'Track Popularity': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (track, source, mod) => searchConditions(mod, track.popularity, source),
    dbName: 'tracks'
  },
  'Date Added': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (track, source, mod) => searchConditions(mod, track.added_at, source),
    dbName: 'tracks'
  },
  'Playlist Followers': {
    conditions: conditions.number,
    data: () => Promise.resolve([]),
    filter: (playlist, source, mod) => searchConditions(mod, playlist.followers, source),
    dbName: 'playlists'
  },
  'Playlist is Public': {
    conditions: conditions.boolean,
    data: () => Promise.resolve([]),
    filter: (playlist, source, mod) => searchConditions(mod, playlist.public, source),
    dbName: 'playlists'
  },
  'Playlist Owner': {
    conditions: conditions.text,
    data: () => Promise.resolve([]),
    filter: (playlist, source, mod) => searchConditions(mod, playlist.owner.display_name, source),
    dbName: 'playlists'
  },
  'Playlist is Collaborative': {
    conditions: conditions.boolean,
    data: () => Promise.resolve([]),
    filter: (playlist, source, mod) => searchConditions(mod, playlist.collaborative, source),
    dbName: 'playlists'
  },
};

export default Object.entries(dropdownOptions).map(([key, values]) => [key, values.conditions, values.data]);;



//old format, don't delete yet

// export default dropdownOptions = [
//   ['Artists Name', conditions.text, () => checkPromise(dexieDB.artists.orderBy('name').uniqueKeys())],
//   ['Artist Popularity', conditions.number, () => Promise.resolve([])],
//   ['Artist Followers', conditions.number, () => Promise.resolve([])],
//   ['Artist Genre', conditions.text, () => checkPromise(dexieDB.artists.orderBy('genre').uniqueKeys())],
//   ['Album Name', conditions.text, () => checkPromise(dexieDB.albums.orderBy('name').uniqueKeys())],
//   ['Album Type', conditions.booleanText, () => checkPromise(dexieDB.artists.orderBy('album_type').uniqueKeys())],
//   ['Album Release Date', conditions.number, () => Promise.resolve([])],
//   ['Album Total Tracks', conditions.number, () => Promise.resolve([])],
//   ['Album Popularity', conditions.number, () => Promise.resolve([])],
//   ['Album Label', conditions.number, () => checkPromise(dexieDB.artists.orderBy('label').uniqueKeys())],
//   ['Number of Tracks in Album', conditions.number, () => Promise.resolve([])],
//   ['Track Name', conditions.text, () => checkPromise(dexieDB.tracks.orderBy('name').uniqueKeys())],
//   ['Track Length', conditions.number, () => Promise.resolve([])],
//   ['Disc Number', conditions.number, () => Promise.resolve([])],
//   ['Track Number', conditions.number, () => Promise.resolve([])],
//   ['Explicit', conditions.booleanText, () => Promise.resolve([true, false])],
//   ['Track Popularity', conditions.number, () => Promise.resolve([])],
//   ['Date Added', conditions.number, () => Promise.resolve([])],
//   ['Playlist Followers', conditions.number, () => Promise.resolve([])],
//   ['Playlist is Public', conditions.boolean, () => Promise.resolve([])],
//   ['Playlist Owner', conditions.text, () => Promise.resolve([])],
//   ['Playlist is Collaborative', conditions.boolean, () => Promise.resolve([])],
// ];

// ['Track Genre', conditions.text, () => {}, //have to implement with a different db than spotify
// ['Album Genre', conditions.text, () => {}], //have to implement with a different db than spotify
//text: 'contains', 'does not contain',
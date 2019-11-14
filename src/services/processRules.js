import db from './dixieStore';
import {dropdownOptions} from '../Data/playlistRuleDropdownOptions';


const filter = async function (db, rules) {
  return await db
    .filter (function (item) {
      return rules.reduce((keep, {mod, source, target}) => {
        if (keep) {
          if (!Array.isArray(target)) {
            target = [target];
          }
          for (let tar of target) {
            let keepItem = dropdownOptions[source].filter(item, tar, mod);
            if (!keepItem) {
              keep = false;
              break;
            }
          }
        }
        return keep;
      }, true);
    })
    .toArray();
  }

  export default async function processRules (rules) {
    if (!Array.isArray(rules)) {
      throw new Error ('rules must be an array');
    }

    const {artistsRules, tracksRules, albumsRules, playlistsRules} = rules.reduce((rules, rule) => {
      const dbName = dropdownOptions[rule.source].dbName;
      rules[dbName + 'Rules'].push(rule);
      return rules;
    }, {artistsRules: [], tracksRules: [], albumsRules: [], playlistsRules: []});

  const [artists, tracks, albums, playlists] = await Promise.all([
    filter(db.artists, artistsRules),
    filter(db.tracks, tracksRules),
    filter(db.albums, albumsRules),
    filter(db.playlists, playlistsRules)
  ]);
  const results = [...artists, ...tracks, ...albums, ...playlists]
  return results
}

//   return rules.reduce((isTrue, rule) => {
//     const {target, mod, source} = rule;
// ['Artists Name',
// ['Artist Popularity',
// ['Artist Followers',
// ['Artist Genre',
// ['Album Name',
// ['Album Type',
// ['Album Release Date',
// ['Album Total Tracks',
// ['Album Popularity',
// ['Album Label',
// ['Number of Tracks in Album',
// ['Track Name',
// ['Track Length',
// ['Disc Number',
// ['Track Number',
// ['Explicit',
// ['Track Popularity',
// ['Date Added',
// ['Playlist Followers',
// ['Playlist is Public',
// ['Playlist Owner',
// ['Playlist is Collaborative'
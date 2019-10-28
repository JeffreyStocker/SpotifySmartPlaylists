import dexieDB from '../services/dixieStore';
import _flatten from 'lodash/flatten';

import {getLikedSongs, getLikedAlbums} from '../../server/spotify/library';
import {getTracksFromPlaylist} from '../../server/spotify/playlist'
import {getPlaylists} from '../../server/spotify/playlists'
import {addTracksToPlaylist} from '../utilites/processSpotifyData';

export async function syncDataFromSpotify (accessToken, callback) {
  try {

    const artistsIDs = new Set();
    const albumsIDs = new Set();

    try {
      const likedAlbums = await getLikedAlbums(accessToken)
      callback();
      const likedTracks = await getLikedSongs(accessToken)
      callback();
      const playlists = await getPlaylists(accessToken)
      callback();
    } catch (err) {
      if (err.status === 404) {

      }
    }

    const playlistTrackRequests = playlists.map(async (playlist) => {
      return await getTracksFromPlaylist(accessToken, playlist.id);
    })

    const playlistTracks = await Promise.all(playlistTrackRequests);

    const uniqueTracks = addTracksToPlaylist(playlists, playlistTracks);

    callback();

    dexieDB.albums.bulkPut(likedAlbums.map(({album}) => album))
      .catch(err => console.error('album save', err));

    dexieDB.tracks.bulkPut(likedTracks.map(({track}) => track))
      .catch(err => console.error('album save', err));

    dexieDB.playlists.bulkPut(playlists)
      .catch(err => console.error('playlist', err));

    dexieDB.tracks.bulkPut(Object.values(uniqueTracks))
      .catch(err => console.error('uniqueTracks', err));

    callback();

  } catch (err) {
    console.error (err)
    debugger
  }
}
/**
 *
 * @param {Array} playlists list of playlists from spotify
 * @param {Array} tracks list to tracks from spotify, each track list should have same index as playlists
 * @returns {Object} set of unique tracks by id
 */

export function addTracksToPlaylist (playlists, tracks) {
  const uniqueTracks = {};
  playlists.forEach((playlist, index) => {
    const tracksIds = tracks[index].map((track) => {
      const trackInfo = {
        ...track,
        track: undefined,
        id: track.track.id
      }
      uniqueTracks[track.track.id] = track.track;
      return trackInfo;
    });
    playlist.tracks = Object.assign(tracksIds, playlist.tracks);
  })
  return uniqueTracks;
}
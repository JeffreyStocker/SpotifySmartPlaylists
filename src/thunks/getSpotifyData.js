

export default function getSpotifyData () {
  let playlists, likedTracks, likedAlbums;

  try {
    const artists = new Set();
    const albums = new Set();

    const token = this.props.user.accessToken;
    likedAlbums = await getLikedAlbums(token)
    this.increaseStep();
    likedTracks = await getLikedSongs(token)
    this.increaseStep();
    playlists = await getPlaylists(token)
    this.increaseStep();

    const likedAlbumsRemovedExtra = likedAlbums.map(({album}) => {
      album.artists = album.artists.map(artist => {
        artists.add(artist.id);
        return artist.id;
      });
      return album;
    })

    const likedTracksRemovedExtra = likedTracks.map((trackObj, index, array) => {
      const track = trackObj.track;
      track.artists = track.artists.map(artist => {
        artists.add(artist.id);
        return artist.id;
      });
      albums.add(track.album.id);
      track.album = track.album.id
      return track;
    });



    // const playlistIDs = playlists.forEach((playlist) => {
    //     getTracksFromPlaylist(token, playlist.id)
    //       .then(data => console.log (data));
    //   })

    const playlistTrackRequests = playlists.map(async (playlist) => {
      return await getTracksFromPlaylist(token, playlist.id);
    })

    const playlistTracks = await Promise.all(playlistTrackRequests);

    console.log ('likedAlbms', likedAlbums);
    console.log ('likedTracks', likedTracks);
    console.log ('playlists', playlists);

  } catch (err) {
    console.error (err)
    debugger
  }
  this.increaseStep();
}
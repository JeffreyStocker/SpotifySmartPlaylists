module.exports = {
  //spotify api
    //library
    SAVED_TRACKS_URL: 'https://api.spotify.com/v1/me/tracks',
    SAVED_ALBUMS_URL: "https://api.spotify.com/v1/me/albums",

    //user

    //tracks
    TRACKS_AUDIO_ANALYSIS_URL: '/v1/audio-analysis/{id}',
    getAudioAnalysisURL: (id) => `/v1/audio-analysis/${id}`,
    TRACKS_AUDIO_FEATURE_URL: '/v1/audio-features/{id}',
    getAudioFeaturesURL: (id) => `/v1/audio-features/${id}`,
    TRACKS_AUDIO_FEATURES_URL: '/v1/audio-features',
    TRACKS_TRACKS_URL: '/v1/tracks',
    TRACKS_TRACK_URL: '/v1/tracks/{id}',
    getAudioTrackURL: (id) => `/v1/tracks/${id}`,


    //albums
    ALBUMS_GET_ALBUMS_MAX_REQUESTS: 20,
    ALBUMS_GET_ALBUM_URL: '/v1/albums/{id}',
    getAlbumURL: (id) => `/v1/albums/${id}`,
    ALBUMS_GET_ALBUMS_URL: '/v1/albums/',
    getAlbumsURL: () => module.exports.ALBUMS_GET_ALBUMS_URL,
    ALBUMS_GET_ALBUM_TRACKS_URL: '/v1/albums/{id}/tracks',
    getAlbumTracksURL: (id) => `/v1/albums/${id}/tracks`,


    //artists
    ARTISTS_GET_ARTIST_URL: '/v1/artists/{id}',
    getArtistsURL: (id) => `/v1/artists/${id}`,
    ARTISTS_GET_ARTIST_ALBUMS_URL: '/v1/artists/{id}/albums',
    getArtistAlbumbsURL: (id) => `/v1/artists/${id}/albums`,
    ARTISTS_GET_ARTIST_TOPTRACKS_URL: '/v1/artists/{id}/top-tracks',
    getArtistsTopTracksURL: (id) => `/v1/artists/${id}/top-tracks`,
    ARTISTS_GET_ARTIST_RELATED_ARTISTS_URL: '/v1/artists/{id}/related-artists',
    getArtistsRelatedArtistsURL: (id) => `/v1/artists/${id}/related-artists`,
    ARTISTS_GET_ARTISTS_URL: '/v1/artists',
    getArtistURL: (id) => `/v1/artists/${id}`,

    //playlists
    /*
      POST 	/v1/playlists/{playlist_id}/tracks 	Add Tracks to a Playlist 	-
      PUT 	/v1/playlists/{playlist_id} 	Change a Playlist's Details 	-
      POST 	/v1/users/{user_id}/playlists 	Create a Playlist 	-
      GET 	/v1/me/playlists 	Get a List of Current User's Playlists 	playlists
      GET 	/v1/users/{user_id}/playlists 	Get a List of a User's Playlists 	playlists
      GET 	/v1/playlists/{playlist_id}/images 	Get a Playlist Cover Image 	list of image objects
      GET 	/v1/playlists/{playlist_id} 	Get a Playlist 	playlist
      GET 	/v1/playlists/{playlist_id}/tracks 	Get a Playlist's Tracks 	tracks
      DELETE 	/v1/playlists/{playlist_id}/tracks 	Remove Tracks from a Playlist 	-
      PUT 	/v1/playlists/{playlist_id}/tracks 	Reorder a Playlist's Tracks 	-
      PUT 	/v1/playlists/{playlist_id}/tracks 	Replace a Playlist's Tracks 	-
      PUT 	/v1/playlists/{playlist_id}/images 	Upload a Custom Playlist Cover Image 	-
    */
    //other
    REQUEST_LIMIT: 50,

}
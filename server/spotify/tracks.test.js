process.env.CLIENT_ID = 'CLIENT_ID';
process.env.CLIENT_SECRET = 'CLIENT_SECRET';
process.env.SPOTIFY_REDIRECT = "localhost"
const {
  getTracks,
  requestTracks,
  eachTrack,
  getAllAlbumsIdsFromTracks} = require ('./tracks');
const spotifyRequest = require ('./spotifyRequest');
const {TRACKS_TRACKS_URL} = require ('../constants')

jest.mock('./spotifyRequest');

const {getFromSpotify, getFromSpotifyWithLimits} = spotifyRequest;
const resetSpotify = function ( ) {
  getFromSpotify. mockClear();
  getFromSpotifyWithLimits.mockClear();
}

describe('module tracks', () => {
  describe ('function getTracks', () => {
    afterEach(resetSpotify);
    it ('should return a promise', () => {
      const tracks = getTracks('sometoken', ['234234234', '54653563', '2626247', '4643652'])
      expect(tracks).toBeInstanceOf(Promise);
      tracks.then (()=> {})
    })

    it ('should have called getFromSpotify 1 time', () => {
      const tracks = getTracks('sometoken', ['234234234', '54653563', '2626247', '4643652'])
      return tracks.then (()=> {
        return expect(getFromSpotifyWithLimits).toHaveBeenCalledTimes(1);
      })
    })

    it ('should resolve into data recieved from getAllAlbumsIdsFromTracks', () => {
      const testData = {
        tracks: [
          {name: 1},
          {name: 2}
        ]
      }
      getFromSpotifyWithLimits.mockReturnValue(Promise.resolve(testData));
      const tracks = getTracks('someToken', ['3523532', '532532', '3463464', '35326326'])
        return tracks.then (results => expect(results).toBe(testData))
    })

    it('should send the correct pararmeters to getAllAlbumsIdsFromTracks', () => {
      const token = 'someToken'
      const ids = ['3523532', '532532', '3463464', '35326326'];
      const tracks = getTracks(token, ids)
      return tracks.then (results => {
        expect(getFromSpotifyWithLimits).toHaveBeenCalledWith(TRACKS_TRACKS_URL, token, expect.any(Object))
        return expect(getFromSpotifyWithLimits.mock.calls[0][2]).toMatchObject({params: {ids: ids.join(',')}})
      })
    })
  })

  describe ('function requestTracks', () => {
    afterEach(resetSpotify);
  })

  describe ('function eachTrack', () => {
    afterEach(resetSpotify);


  })

  describe ('function getAllAlbumsIdsFromTracks', () => {
    afterEach(resetSpotify);

    const tracks = [
      {
        track: {
          album: {
            id: 'test1',
          },
          is_local: false
        }
      },
      {
        track: {
          album: {
            id: 'test2'
          },
          is_local: true
        }
      }
    ];

    it('should return ids of albums from list of tracks', () => {

      return getAllAlbumsIdsFromTracks(tracks).then (ids => {
        expect(ids).toBeInstanceOf(Set);
        const keys = Array.from(ids.keys());
        expect(keys).toContain('test1');
        expect(keys).not.toContain('test2');
        return;
      })
    })

    it ('should return list of ids included local tracks', () => {
      return getAllAlbumsIdsFromTracks(tracks, {ignoreLocal: false}).then (ids => {
        expect(ids).toBeInstanceOf(Set);
        const keys = Array.from(ids.keys());
        expect(keys).toContain('test1');
        expect(keys).toContain('test2');
        return;
      })
    })
  })
})
const axios = require ('axios');
jest.mock('../database/users.js');
jest.mock('axios')
jest.mock('../spotify/spotifyRequest.js');

process.env.CLIENT_ID = "client_id_mock"
process.env.CLIENT_SECRET = "client_secret_mock"
process.env.SPOTIFY_REDIRECT = "SPOTIFY_REDIRECT_mock"

const spotifyRequest = require ('../spotify/spotifyRequest');

const {
  getFromSpotifyWithLimits,
  getFromSpotify,
  getFromSpotifyByIds
} = jest.requireActual('../spotify/spotifyRequest');

describe('module spotifyRequest', () => {
  beforeEach(() => {
    jest.resetAllMocks('axios')

  })
  describe('function getFromSpotify', () => {
    it('should call axios.get', () => {
      return getFromSpotify('some random url', 'random token')
        .then(results => {
          expect(axios.get).toHaveBeenCalledTimes(1);
        })
    })

    it('should have called axios.get with arguments', () => {
      const args = {
        url: 'urlArg',
        token: 'tokenArg',
        options: {
          params: {
          }
        }
      }
      const request = getFromSpotify(args.url, args.token, args.options);
      return request.then (results => {
        expect(axios.get).toHaveBeenCalledWith(args.url, expect.any(Object))
      })
    })

    it('should have returned a promise', () => {
      expect(getFromSpotify()).toBeInstanceOf(Promise);
    })

    it('should return data property from axios.get', () => {
      const mockedData = {
        arg1: 'test1',
        arg2: 'test2'
      }
      axios.get.mockReturnValueOnce(Promise.resolve({data: mockedData}))
      return getFromSpotify('someUrl', 'token')
        .then(data => {
          expect(data).toStrictEqual(mockedData);
          expect(data).toStrictEqual(expect.objectContaining({
            arg1: 'test1',
            arg2: 'test2'
          }))
        })
    })
  })

  describe('function getFromSpotifyWithLimits', () => {
    it('should return a promise', () => {
      expect(getFromSpotifyWithLimits()).toBeInstanceOf(Promise);
    })

    it('should call axios one time', () => {
      axios.get.mockResolvedValueOnce({data: {items: ['test', 'test2'], next: null}})
      return getFromSpotifyWithLimits('url', 'token', {params: {ids: ['setst', 'ewtewt']}})
        .then(results => {
          return expect(axios.get).toHaveBeenCalledTimes(1);
        })
    })

    it('should call axios 2 times when returned with next url', () => {
      axios.get.mockClear();
      const response1 = {data: {
        items: [],
        next: 'weirdURL'
      }}

      const response2 = {
        data: {
          items: [],
          next: null
        }
      }
      axios.get.mockResolvedValueOnce(response1);
      axios.get.mockResolvedValueOnce(response2);
      return getFromSpotifyWithLimits('url', 'token')
        .then(items => {
          return expect(axios.get).toHaveBeenCalledTimes(2);
        })
    })
  })

  describe('function getFromSpotifyByIds', () => {

  })
})
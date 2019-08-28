process.env.CLIENT_ID = 'CLIENT_ID';
process.env.CLIENT_SECRET = 'CLIENT_SECRET';
process.env.SPOTIFY_REDIRECT = "localhost"
const tracks = require ('./tracks');
const axios = require ('axios');

jest.mock('axios');


describe ('track api request to spotify', () => {
  const resp = {test: 'yes'};
  test('should call axios once for under 50 items', () => {
    axios.get.mockResolvedValue(Promise.resolve(resp));
    return tracks.getTracks('token', ['3243424', '312412312', '53435']).then(results => {
      expect(axios.get.mock.calls.length).toEqual(1);
    })
  })
  test('should call axios twice for above 50 but under 101 items', () => {
    axios.get.mockClear();
    return tracks.getTracks('token', new Array(75).fill(342323)).then(results => {
      expect(axios.get.mock.calls.length).toEqual(2);
    }).catch(err => {console.error (err)})
  })

  test ('should call axios 3 times for above 100 but under 151', () => {
    axios.get.mockClear();
    tracks.getTracks('token', new Array(125).fill(342323)).then(results => {
      return expect(axios.get.mock.calls.length).toEqual(3);
    })
  })
  test('should call 3 times for 101 items', () => {
    axios.get.mockClear();
    tracks.getTracks('token', new Array(101).fill(342323)).then(results => {
      return expect(axios.get.mock.calls.length).toEqual(3);
    })
  })
  test('should call 3 times for 150 items', () => {
    axios.get.mockClear();
    tracks.getTracks('token', new Array(150).fill(342323)).then(results => {
      return expect(axios.get.mock.calls.length).toEqual(3);
    })
  })


})
const dexie = require ('dexie');
const db = require ('./dixieStore');
const refArtistList = require ('../../ref/artist.json');

Jest.mock(dexie);

describe('dexie store', () => {
  describe ('artist store', () => {
    it ('should stores an artist file', () => {
      db.artists.add({})
    })
  })
})
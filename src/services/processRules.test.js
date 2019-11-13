import indexedDB from 'fake-indexeddb';
import IDkey from 'fake-indexeddb/lib/FDBKeyRange'

import Dexie from 'dexie';
// Dexie.dependencies.indexedDB = indexedDB;
// Dexie.dependencies.IDBKeyRange = IDkey;

import processRules from './processRules';
import dexieStore from '../services/dixieStore';

import mockArtistData from '../../ref/artist.json';
import mockLikeAlbums from '../../ref/likeAlbums.json';
import mockLikedTracks from '../../ref/likedTracks.json';
// jest.setTimeout(10000);

// jest.mock('dexie');
const tracks = [
];

const artists = [
  {
    name: 'DragonForce',
    id: Math.random()
  },
  {
    name: 'GoGo',
    id: Math.random()
  },
  {
    name: 'Happy Crazy',
    id: Math.random()
  }
]
beforeAll(async () => {
  await dexieStore.artists.bulkAdd(artists);
  // await dexieStore.artists.bulkAdd(mockArtistData.artists);
  // await dexieStore.tracks.bulkAdd(mockLikedTracks.likedTracks.map(track => track.track));
  // await dexieStore.albums.bulkAdd(mockLikeAlbums.likedAlbums.map(album => album.album));
  // dexieStore.artists.count().then(console.log);

});

describe('processRules tests', () => {

  describe('systemic tests', () => {
    test('should return a promise', () => {
      const test = processRules(['Artists Name', 'includes', ['test']])
      expect(test).toEqual(expect.any(Promise));
      return test;
    });

    test('should resolve into an array', () => {
      return processRules(['ytes', 'no'])
        .then(results => {
          expect(results).toStrictEqual(expect.any(Array));
        })
    });

    describe('data tests', () => {
      describe('positive tests', () => {
        test('should return all artists with name dragonforce', () => {
          return processRules ([{source: 'Artist Name', mod: 'is',target: 'DragonForce'}])
            .then(results => {
              expect(results.length).toBeGreaterThan(0);
            })

        })
      })
    })
  });

  // test('should return list of artists with name Greg', () => {

  // });
});

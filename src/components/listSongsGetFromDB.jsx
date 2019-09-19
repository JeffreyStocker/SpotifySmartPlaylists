import React, {useState, useEffect} from 'react';
import ListSongs from './ListSongs.jsx';

import dexieDB from '../services/dixieStore.js'

export default function (props) {
  const tracks = props;
  const [foundTracks, setTracks] = useState(null);
  console.log ('run')
  useEffect(() => {
    if (!foundTracks) {
      Promise.all(tracks.tracks.map(async (track) => {
        track.track = await dexieDB.tracks.where('id').equals(track.id).first();
        return track;
      }))
        .then(processedTracks => {
          setTracks(processedTracks)
        })
    }
  })

  return (
    !foundTracks ? null : <ListSongs tracks={foundTracks}></ListSongs>
  )
}
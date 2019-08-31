import React from 'react';
import Login from './Login.jsx'

const buttonNames = ['playlists'];

export default function Menu () {
  return (
    <div className="menu">
      {buttonNames.map(name => <button className="button" key={name}>{name}</button>)}
      <button><Login></Login></button>
      <a href="/test?id=kagesennin"><button className="button">test</button></a>

    </div>
  )
}
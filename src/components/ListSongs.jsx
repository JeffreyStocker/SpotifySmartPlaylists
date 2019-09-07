import React from 'react';
import {Table} from 'semantic-ui-react';

export default class ListSongs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        ['Name', true, 'name', "Dawn of Victory"],
        ['Album', true,  'album', (album) => album.name],
        ['Artists', true,  'artists',
          (artists) => {
            return artists.reduce((acc, artist) => {
              acc.push(artist.name);
              return acc;
          }, []).join(' ')}
        ],
        ['Track Number', true,  'track_number', 2],
        ['Disk Number', true,  'disc_number', 1],
        ['Duration', true,  'duration_ms', 287026],
        ['Popularity', true,  'popularity', 50],
        ['Explicit', true,  'explicit', false],
        ['HREF', false, 'href',	["https://api.spotify.com/…s/2Wy6uQOX2y45ooKuQb7Q9B"]],
        ['ID', false, 'id',	"2Wy6uQOX2y45ooKuQb7Q9B"],
        ['Preview URL', false, 'preview_url',	"https://p.scdn.co/mp3-pr…b4ae407c9a7d3111b6e6c16f"],
        ['Available Markets', false, 'available_markets',	() => {}],
        ['External Ids', false, 'external_ids',	() => {}],
        ['External URLS', false, 'external_urls',	() => {}],
        ['Is Local', false, 'is_local',	false],
        ['Type', false, 'type',	"track"],
        ['URI', false, 'uri',	"spotify:track:2Wy6uQOX2y45ooKuQb7Q9B"],
      ]
    }
  }

  render() {
    const {
      state: {columns},
      props: {tracks}
    } = this;

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            {columns.map(([label, enabled]) => {
              return enabled ? (<Table.HeaderCell key={label}>{label}</Table.HeaderCell>) : null;
            })}
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tracks.map(({track}) => {
            return (
              <Table.Row key={track.id}>
                {columns.map(([label, enabled, propertyName, optCallback]) => {
                  if (enabled) {
                    return <Table.Cell key={track.id + label}><span>{typeof optCallback === 'function' ? optCallback(track[propertyName]) : track[propertyName]}</span></Table.Cell>
                  } else {
                    return null
                  }
                })}

              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}
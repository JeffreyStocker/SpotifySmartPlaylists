import React from 'react';
import {Grid} from 'semantic-ui-react';

import SelectModifier from './ListPlaylists_SelectModifier.jsx';

export default function (props) {
  const {columns = 3} = props;
  return (
    <Grid.row columns={columns}>
      <SelectModifier></SelectModifier>
    </Grid.row>
  )
}
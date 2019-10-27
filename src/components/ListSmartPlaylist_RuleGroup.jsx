import React from 'react';
import {Grid, Input, Dropdown, Segment} from 'semantic-ui-react';
import SelectModifier from './ListSmartPlaylists_SelectModifier.jsx';
import AddAndSubract from './Button_AddAndSubtract.jsx';
import ComplexSelection from './ListSmartPlaylists_ComplexMod.jsx';
import Search from './ListSmartPlaylist_RuleSaveValue.jsx';

import dexieDB from '../services/dixieStore';
import PropTypes from 'prop-types';
import checkPromise from '../utilites/promiseCheck';

const conditions = {
  number: ['greater than', 'less than', 'equal to', 'not greater to', 'is between'],
  text: ['includes', 'does not include', 'is', 'is not', 'contains', 'does not contain', 'starts with', 'end with'],
  booleanText: ['is', 'is not'],
  boolean: ['is true', 'is not true']
};

const primary = [
  ['Artists Name', conditions.text, () => checkPromise(dexieDB.artists.orderBy('name').uniqueKeys())],
  ['Artist Popularity', conditions.number, () => Promise.resolve([])],
  ['Artist Followers', conditions.number, () => Promise.resolve([])],
  ['Artist Genre', conditions.text, () => checkPromise(dexieDB.artists.orderBy('genre').uniqueKeys())],
  ['Album Name', conditions.text, () => checkPromise(dexieDB.albums.orderBy('name').uniqueKeys())],
  ['Album Type', conditions.booleanText, () => checkPromise(dexieDB.artists.orderBy('album_type').uniqueKeys())],
  ['Album Release Date', conditions.number, () => Promise.resolve([])],
  ['Album Total Tracks', conditions.number, () => Promise.resolve([])],
  ['Album Popularity', conditions.number, () => Promise.resolve([])],
  ['Album Label', conditions.number, () => checkPromise(dexieDB.artists.orderBy('label').uniqueKeys())],
  ['Number of Tracks in Album', conditions.number, () => Promise.resolve([])],
  ['Track Name', conditions.text, () => checkPromise(dexieDB.tracks.orderBy('name').uniqueKeys())],
  ['Track Length', conditions.number, () => Promise.resolve([])],
  ['Disc Number', conditions.number, () => Promise.resolve([])],
  ['Track Number', conditions.number, () => Promise.resolve([])],
  ['Explicit', conditions.booleanText, () => Promise.resolve([true, false])],
  ['Track Popularity', conditions.number, () => Promise.resolve([])],
  ['Date Added', conditions.number, () => Promise.resolve([])],
  ['Playlist Followers', conditions.number, () => Promise.resolve([])],
  ['Playlist is Public', conditions.boolean, () => Promise.resolve([])],
  ['Playlist Owner', conditions.text, () => Promise.resolve([])],
  ['Playlist is Collaborative', conditions.boolean, () => Promise.resolve([])],
];
// ['Track Genre', conditions.text, () => {}, //have to implement with a different db than spotify
// ['Album Genre', conditions.text, () => {}], //have to implement with a different db than spotify

const primaryNames = (() => primary.map(i => i[0]))();
const primaryValues = (() => primary.reduce((acc, [key, ...rest]) => {
  acc[key] = rest;
  return acc;
}, {}))();


export default class RuleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPrimary: null,
      selectedPrimaryIndex: null,
    };
    this.handleModifierUpdate = this.handleModifierUpdate.bind(this);
    this.generateFields = this.generateFields.bind(this);
  }

  handleModifierUpdate(target, newVal) {
    console.log (target, newVal);
    const newRule = Object.assign({}, this.props.rule);
    newRule[target] = newVal;
    this.props.onChange(newRule);
  }

  generateFields (rule) {
    if (rule.target) {
      if (primaryValues[this.props.rule.target][0] === conditions.text) {
        return <Search
          fluid
          onChange={(x, y, val) => handleModifierUpdate('filter', val)}
          options={rule.target && primaryValues[rule.target][1]}
          values={rule.filter || []}
        />;
      } else if (primaryValues[this.props.rule.target][0] === conditions.number) {
        return <Input fluid placeholder="Number"></Input>;
      } else if (primaryValues[this.props.rule.target][0] === conditions.booleanText) {
        return (
          <Dropdown selection fluid inline={false} value={this.props.rule.filter}>
            <Dropdown.Menu value={this.props.rule.filter}>
              <Dropdown.Item active={this.props.rule.filter === true} onClick={() => this.handleModifierUpdate('filter', [true])}>True</Dropdown.Item>
              <Dropdown.Item active={this.props.rule.filter === false} onClick={() => this.handleModifierUpdate('filter', [false])}>False</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      } else if (primaryValues[this.props.rule.target][0] === conditions.boolean) {
        return null;
      }
    }
  }

  render() {
    const {
      props: {rule},
      state: {selectedPrimary, selectedPrimaryIndex},
      handleModifierUpdate
    } = this;

    return (
      <Grid.Row>
        <Grid.Column width={2} verticalAlign="middle">
          <AddAndSubract
            increase={(evt) => this.props.handleAddRule(evt)}
            decrease={(evt) => this.props.handleRemoveRule(evt)}
          />
        </Grid.Column>
        <Grid.Column width={4}><SelectModifier
          onChange={(x, y, val) => handleModifierUpdate('target', val)}
          options={primaryNames}
          value={rule.target}
        /></Grid.Column>
        <Grid.Column width={4}><SelectModifier
          onChange={(x, y, val) => handleModifierUpdate('mod', val)}
          options={rule.target && primaryValues[rule.target][0]}
          value={rule.mod}
        /></Grid.Column>
        <Grid.Column width={6}>
          {this.generateFields(rule)}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

RuleGroup.propTypes = {
  // rule: PropTypes.array.isRequired
};


/*

<ComplexSelection
          onChange={(x, y, val) => handleModifierUpdate('filter', val)}
          options={rule.target && primaryValues[rule.target][1]}
          value={rule.filter}
        />

rule example = {
  isSubrule: false,
  target: null,
  mod: null,
  filter: ''
}

*/
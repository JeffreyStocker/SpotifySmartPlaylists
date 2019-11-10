import React from 'react';
import {Grid, Input, Dropdown, Segment} from 'semantic-ui-react';
import SelectModifier from './ListSmartPlaylists_SelectModifier.jsx';
import AddAndSubract from './Button_AddAndSubtract.jsx';
import ComplexSelection from './ListSmartPlaylists_ComplexMod.jsx';
import Search from './ListSmartPlaylist_RuleSaveValue.jsx';

import dexieDB from '../services/dixieStore';
import PropTypes from 'prop-types';
import checkPromise from '../utilites/promiseCheck';

import primary, {conditions} from '../Data/playlistRuleDropdownOptions';



const primaryNames = (() => primary.map(i => i[0]))();
const primaryValues = (() => primary.reduce((acc, [key, ...rest]) => {
  acc[key] = rest;
  return acc;
}, {}))();


export default class RuleGroup extends React.Component {
  constructor(props) {
    super(props);
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
          onChange={(x, y, val) => this.handleModifierUpdate('source', val)}
          options={rule.target && primaryValues[rule.target][1]}
          items={rule.source || []}
        />;
      } else if (primaryValues[rule.target][0] === conditions.number) {
        return <Input fluid placeholder="Number" onKeyPress={(evt) => {evt.persist(); console.log (evt)}}></Input>;
      } else if (primaryValues[rule.target][0] === conditions.booleanText) {
        return (
          <Dropdown selection fluid inline={false} value={rule.source}>
            <Dropdown.Menu value={rule.source}>
              <Dropdown.Item active={rule.source === true} onClick={() => this.handleModifierUpdate('filter', [true])}>True</Dropdown.Item>
              <Dropdown.Item active={rule.source === false} onClick={() => this.handleModifierUpdate('filter', [false])}>False</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      } else if (primaryValues[rule.target][0] === conditions.boolean) {
        return null;
      }
    }
  }

  render() {
    const {
      props: {rule},
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
        <Grid.Column width={4}><SelectModifier /* target */
          onChange={(x, y, val) => handleModifierUpdate('target', val)}
          options={primaryNames}
          value={rule.target}
        /></Grid.Column>
        <Grid.Column width={4}><SelectModifier /* mod */
          onChange={(x, y, val) => handleModifierUpdate('mod', val)}
          options={rule.target && primaryValues[rule.target][0]}
          value={rule.mod}
        /></Grid.Column>
        <Grid.Column width={6}> {/* source */}
          {this.generateFields(rule)}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

RuleGroup.propTypes = {
  rule: PropTypes.object.isRequired
};
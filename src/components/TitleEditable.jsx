import React from 'react';
import {Button, Icon, Input, Segment} from 'semantic-ui-react';

export default class TitleEditable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      text: props.text ? props.text : "Default Text",
      editing: false
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleTextChange(evt) {
    this.setState({text: evt.target.value})
  }

  handleAccept(evt) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(evt, this.state.text)
    }
    this.handleEdit(evt);
  }

  handleReject(evt) {
    this.setState({text: this.props.text})
    this.handleEdit(evt)
  }

  handleEdit(evt) {
    evt.stopPropagation();
    this.setState({editing : !this.state.editing});
  }

  handleKeyPress(evt) {
    if (evt.key === 'Escape') {
      this.handleReject();
    } else if (evt.key === "Enter") {
      this.handleAccept();
    }
  }


  render () {
    return (
      <React.Fragment>

        {this.state.editing &&
          <Input
            icon
            focus
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyPress}
            onClick={(evt) => evt.stopPropagation()}
            >
            <input></input>
            <div style={{display: "flex"}}>
              <Icon name="check" size="large" style={{position: 'relative', right: '100%', alignSelf: "center"}} onClick={this.handleAccept}></Icon>
              <Icon name="cancel" size="large" style={{position: 'relative', right: '100%', alignSelf: "center"}} onClick={this.handleReject}></Icon>
            </div>

          </Input>}

        {!this.state.editing &&
          <span onDoubleClick={this.handleEdit}>
            {this.state.text}&nbsp;&nbsp;
            <Icon name="edit" onClick={this.handleEdit}/>
          </span>
        }

      </React.Fragment>
    );
  }
}

// style={{float: "right"}}
import React, { Component, PropTypes } from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import Input from 'common/components/Input';

class AddPlayer extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.newPlayerSubmitted();
  };

  handleNameChange = e => {
    this.props.fieldChanged({
      field: 'players.newPlayer.name',
      value: e.target.value
    });
  };

  handleScoreChange = e => {
    this.props.fieldChanged({
      field: 'players.newPlayer.score',
      value: e.target.value
    });
  };

  hasError = field => {
    return (
      this.props.newPlayer.showErrors &&
      !field.isValid
    );
  };

  render () {
    const {
      newPlayer: {
        name,
        score
      }
    } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="mBl"
      >
        <div className="grid grid--withGutter">
          <Input
            type="text"
            id="name"
            className="grid-cell w100 w50--l mBm"
            label="Name"
            value={name.value}
            onChange={this.handleNameChange}
            isError={this.hasError(name)}
            message={name.errorMessage}
          />
          <Input
            type="text"
            id="score"
            className="grid-cell w100 w50--l mBm"
            label="Score"
            value={score.value}
            onChange={this.handleScoreChange}
            isError={this.hasError(score)}
            message={score.errorMessage}
          />
        </div>
        <button
          className="btn fill-blue125"
          type="submit"
        >
          {'Add player'}
        </button>
      </form>
    );
  }
}

AddPlayer.propTypes = {
  newPlayer: PropTypes.object
};

export default connect({
  newPlayer: state`players.newPlayer`,
  fieldChanged: signal`players.fieldChanged`,
  newPlayerSubmitted: signal`players.newPlayerSubmitted`
}, AddPlayer);

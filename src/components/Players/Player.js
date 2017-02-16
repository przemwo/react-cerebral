import React, { Component, PropTypes } from 'react';
import { connect } from 'cerebral/react';
import { state, signal, props } from 'cerebral/tags';

class Player extends Component {
  handleRemovePlayerClick = () => {
    const { playerKey } = this.props;

    this.props.removePlayerClicked({ playerKey });
  };

  render () {
    const { player } = this.props;

    return (
      <li className="listBlock-item pVs">
        <div className="flexTable flexTable--middle">
          <div className="flexTable-sizeFill">
            <b className="dB mRs">{player.name}</b>
            {'Score: '}{player.score}
          </div>
          <div className="flexTable-sizeFit">
            <button
              className="red100 fwB wsNW pAs"
              type="button"
              onClick={this.handleRemovePlayerClick}
            >
              <span className="mRs">{'\u00D7'}</span>
              {'Remove'}
            </button>
          </div>
        </div>
      </li>
    );
  }
}

Player.propTypes = {
  playerKey: PropTypes.string.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number
  })
};

export default connect({
  player: state`players.data.${props`playerKey`}`,
  removePlayerClicked: signal`players.removePlayerClicked`
}, Player);

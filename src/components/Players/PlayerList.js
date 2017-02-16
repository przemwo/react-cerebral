import React, { Component, PropTypes } from 'react';
import { connect } from 'cerebral/react';

import sortedPlayerKeys from 'computed/sortedPlayerKeys';
import totalScoreCount from 'computed/totalScoreCount';
import Player from './Player';

class PlayerList extends Component {
  renderPlayer (key) {
    return (
      <Player
        key={key}
        playerKey={key}
      />
    );
  }

  render () {
    const { playerKeys, totalScoreCount } = this.props;

    if (!playerKeys.length) {
      return (
        <p className="gray100">{'Add some players'}</p>
      );
    }

    return (
      <div>
        <ul className="listBlock listBlock--withDivider mBl">
          {playerKeys.map(this.renderPlayer, this)}
        </ul>
        <p className="mAn">
          {'Total score: '}
          <span className="dB gamma">
            {totalScoreCount}
          </span>
        </p>
      </div>
    );
  }
}

PlayerList.propTypes = {
  playerKeys: PropTypes.array,
  totalScoreCount: PropTypes.number
};

export default connect({
  playerKeys: sortedPlayerKeys,
  totalScoreCount
}, PlayerList);

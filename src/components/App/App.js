import React, { Component, PropTypes } from 'react';
import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';

import { VIEWS } from 'common/constants';
import Players from '../Players';
import Repos from '../Repos';
import NotFound from './NotFound';

const viewToComponentMap = {
  [VIEWS.PLAYERS]: Players,
  [VIEWS.REPOS]: Repos,
  [VIEWS.NOT_FOUND]: NotFound
};

const navigationMap = {
  [VIEWS.PLAYERS]: {
    name: 'Players',
    url: '#/'
  },
  [VIEWS.REPOS]: {
    name: 'Repos',
    url: '#/repos'
  }
};

class App extends Component {
  renderNav () {
    return (
      <ul className="nav nav--block txtC">
        {Object.keys(navigationMap).map(this.renderNavItem, this)}
      </ul>
    );
  }

  renderNavItem (key) {
    const navItem = navigationMap[key];
    const { currentView } = this.props;
    const isActive = currentView === key;

    return (
      <li
        key={key}
        className={`nav-item${isActive ? ' is-active' : ''}`}
      >
        <a
          className="nav-link"
          href={navItem.url}
        >
          {navItem.name}
        </a>
      </li>
    );
  }

  render () {
    const { currentView } = this.props;
    const { subTitle } = this.props;

    const View = viewToComponentMap[currentView];

    return (
      <div>
        <header className="fixed fill-navy100 w100">
          {this.renderNav()}
        </header>
        <div className="posR tH pVl pHm mHa measure">
          <h3>{subTitle}</h3>
          <View />
        </div>
      </div>
    );
  }

}

App.propTypes = {
  currentView: PropTypes.oneOf(Object.values(VIEWS)),
  subTitle: PropTypes.string
};

console.log(state);

export default connect({
  currentView: state`app.currentView`,
  subTitle: state`app.subTitle`
}, App);

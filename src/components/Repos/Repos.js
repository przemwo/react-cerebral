import React, { Component, PropTypes } from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import setTitle from 'common/components/setTitle';
import UserSelect from './UserSelect';

export class Repos extends Component {
  componentDidMount () {
    this.props.mounted();
  }

  renderRepo (repo) {
    return (
      <li key={repo.id}>
        <a href={repo.html_url}>{repo.name}</a>
      </li>
    );
  }

  render () {
    const { repoList, isFetchingRepos } = this.props;

    const shouldRenderRepos = (
      repoList.length > 0 &&
      !isFetchingRepos
    );

    return (
      <div>
        <h1 className="beta mBm">{'User repos'}</h1>
        <UserSelect />
        {isFetchingRepos && (
          <p className="gray100">{'Fetching repos\u2026'}</p>
        )}
        {shouldRenderRepos && (
          <ul>
            {repoList.map(this.renderRepo, this)}
          </ul>
        )}
      </div>
    );
  }
}

Repos.propTypes = {
  repoList: PropTypes.array,
  isFetchingRepos: PropTypes.bool
};

export default connect(
  {
    repoList: state`repos.list`,
    isFetchingRepos: state`repos.isFetchingRepos`,
    mounted: signal`repos.mounted`
  },
  setTitle('Repos')(Repos)
);

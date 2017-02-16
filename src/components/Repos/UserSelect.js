import React, { Component, PropTypes } from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import Select, { NOVALUE } from 'common/components/Select';
import userOptions from 'computed/userOptions';

class UserSelect extends Component {
  handleUserChange = e => {
    this.props.selectedUserIdChanged({
      nextId: e.target.value
    });
  };

  render () {
    const {
      userOptions,
      selectedUserId,
      isFetchingUsers
    } = this.props;

    return (
      <Select
        id="user"
        label="Select user"
        className="mBl"
        options={userOptions}
        onChange={this.handleUserChange}
        value={selectedUserId || NOVALUE}
        disabled={isFetchingUsers}
      />
    );
  }
}

UserSelect.propTypes = {
  userOptions: PropTypes.array,
  isFetchingUsers: PropTypes.bool
};

export default connect({
  userOptions,
  selectedUserId: state`repos.selectedUserId`,
  isFetchingUsers: state`repos.isFetchingUsers`,
  selectedUserIdChanged: signal`repos.selectedUserIdChanged`
}, UserSelect);

import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

import processUsers from '../../actions/processUsers';
import githubGet from '../../actions/factories/githubGet';

export default function getUsersForOrganization (orgName) {
  return [
    set(state`repos.isFetchingUsers`, true),
    githubGet(`/orgs/${orgName}/members`), {
      success: [
        processUsers,
        set(state`repos.usersById`, props`result`)
      ],
      error: []
    },
    set(state`repos.isFetchingUsers`, false)
  ];
}

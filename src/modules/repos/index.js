import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

import { VIEWS } from 'common/constants';
import changeView from 'common/chains/factories/changeView';
import getReposForSelectedUser from './chains/getReposForSelectedUser';
import getUsersForOrganization from './chains/factories/getUsersForOrganization';

const GITHUB_ORG = 'cerebral';

export default {
  state: {
    isFetchingUsers: false,
    usersById: Object.create(null),
    selectedUserId: null,
    isFetchingRepos: false,
    list: []
  },
  signals: {
    selectedUserIdChanged: [
      set(state`repos.selectedUserId`, props`nextId`),
      ...getReposForSelectedUser
    ],
    mounted: getUsersForOrganization(GITHUB_ORG),
    routed: changeView(VIEWS.REPOS)
  }
};

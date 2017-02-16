import { set, when } from 'cerebral/operators';
import { state, props, string } from 'cerebral/tags';

import outputSelectedUserLogin from '../actions/outputSelectedUserLogin';
import processRepos from '../actions/processRepos';
import githubGet from '../actions/factories/githubGet';

export default [
  outputSelectedUserLogin,
  when(props`login`), {
    true: [
      set(state`repos.isFetchingRepos`, true),
      githubGet(
        string`/users/${props`login`}/repos`,
        {
          type: 'all',
          sort: 'updated'
        }
      ), {
        success: [
          processRepos,
          set(state`repos.list`, props`result`)
        ],
        error: []
      },
      set(state`repos.isFetchingRepos`, false)
    ],
    false: [
      set(state`repos.list`, [])
    ]
  }
];

import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

import { NOVALUE } from 'common/components/Select';

const DEFAULT_OPTION = {
  value: NOVALUE,
  label: ''
};

function userOptions (usersKeys, get) {
  return (usersKeys || []).reduce(
    (options, userKey) => {
      options.push({
        value: userKey,
        label: get(state`repos.usersById.${userKey}.login`)
      });

      return options;
    },
    [DEFAULT_OPTION]
  );
}

export default compute(
  state`repos.usersById.*`,
  userOptions
);

import React from 'react';

import setTitle from 'common/components/setTitle';
import PlayerList from './PlayerList';
import AddPlayer from './AddPlayer';

export function Players () {
  return (
    <div>
      <AddPlayer />
      <PlayerList />
    </div>
  );
}

export default setTitle('Players')(Players);

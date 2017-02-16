import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

function sortedPlayerKeys (playersKeys, get) {
  return (playersKeys || []).sort((playerAKey, playerBKey) => {
    const playerAScore = get(state`players.data.${playerAKey}.score`);
    const playerBScore = get(state`players.data.${playerBKey}.score`);

    if (playerAScore > playerBScore) {
      return -1;
    } else if (playerAScore < playerBScore) {
      return 1;
    }

    return 0;
  });
}

export default compute(
  state`players.data.*`,
  sortedPlayerKeys
);

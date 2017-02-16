import { compute } from 'cerebral';
import { state } from 'cerebral/tags';

function totalScoreCount (playersKeys, get) {
  return (playersKeys || []).reduce(
    (currentCount, playerKey) => {
      return currentCount + get(state`players.data.${playerKey}.score`);
    },
    0
  );
}

export default compute(
  state`players.data.*`,
  totalScoreCount
);

import uuid from 'common/utils/uuid';

export default function createPlayerWithNameAndScore ({ state }) {
  const name = state.get('players.newPlayer.name.value');
  const score = Number(state.get('players.newPlayer.score.value'));

  const playerKey = uuid();
  const player = {
    name,
    score
  };

  state.set(`players.data.${playerKey}`, player);
}

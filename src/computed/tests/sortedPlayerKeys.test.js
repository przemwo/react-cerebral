import { runCompute } from 'cerebral/test';

import sortedPlayerKeys from '../sortedPlayerKeys';

describe('sortedPlayerKeys() computed', () => {
  it('returns sorted player keys', () => {
    const fakeState = {
      players: {
        data: {
          '443fd35f': {
            name: 'player1',
            score: 10
          },
          '187457c2': {
            name: 'player2',
            score: 20
          },
          '5a89a1d9': {
            name: 'player3',
            score: 5
          }
        }
      }
    };
    const result = runCompute(sortedPlayerKeys, { state: fakeState });

    expect(result).toMatchSnapshot();
  });
});

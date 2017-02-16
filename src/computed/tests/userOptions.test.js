import { runCompute } from 'cerebral/test';

import userOptions from '../userOptions';

describe('userOptions() computed', () => {
  it('returns correct options for users select', () => {
    const fakeState = {
      repos: {
        usersById: {
          4643: {
            id: 4643,
            login: 'garth'
          },
          36270: {
            id: 36270,
            login: 'Guria'
          }
        }
      }
    };
    const result = runCompute(userOptions, { state: fakeState });

    expect(result).toMatchSnapshot();
  });
});

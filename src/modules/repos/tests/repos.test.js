import githubGet from '../actions/factories/githubGet';
import outputSelectedUserLogin from '../actions/outputSelectedUserLogin';
import processRepos from '../actions/processRepos';
import processUsers from '../actions/processUsers';

describe('Repos module', () => {
  describe('githubGet() factory', () => {
    it('returns object with users', () => {
      const githubResponse = {
        result: [
          {
            login: 'christianalfoni',
            id: 3956929
          },
          {
            login: 'guria',
            id: 36270
          }
        ]
      };

      const mockedContext = {
        http: {
          get (/* url, passedQuery, options */) {
            return Promise.resolve();
          }
        },
        path: {
          success: jest.fn()
        },
        resolve: {
          value (value) {
            return value;
          }
        }
      };

      mockedContext.path.success.mockReturnValue(githubResponse);

      const get = githubGet('/orgs/cerebral/members');

      return get(mockedContext).then(result => {
        expect(mockedContext.path.success).toHaveBeenCalled();
        expect(result).toEqual(githubResponse);
      });
    });
  });

  describe('outputSelectedUserLogin()', () => {
    const usersById = {
      4643: {
        id: 4643,
        login: 'garth'
      },
      36270: {
        id: 36270,
        login: 'Guria'
      }
    };

    describe('given a valid selectedUserId', () => {
      it('returns object with user login', () => {
        const selectedUserId = 36270;

        const iterator = [
          usersById,
          selectedUserId
        ][Symbol.iterator]();

        const mockedContext = {
          state: {
            get (/* path */) {
              return iterator.next().value;
            }
          }
        };

        const expectedResult = {
          login: 'Guria'
        };
        const result = outputSelectedUserLogin(mockedContext);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('without selectedUserId', () => {
      it('returns object with undefined login property', () => {
        const selectedUserId = null;

        const iterator = [
          usersById,
          selectedUserId
        ][Symbol.iterator]();

        const mockedContext = {
          state: {
            get (/* path */) {
              return iterator.next().value;
            }
          }
        };

        const expectedResult = {
          login: null
        };
        const result = outputSelectedUserLogin(mockedContext);

        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('processRepos()', () => {
    it('correctly transforms repos data', () => {
      const githubRepos = [
        {
          id: 10420161,
          name: 'alwaysprogress',
          full_name: 'christianalfoni/alwaysprogress',
          private: false,
          html_url: 'https://github.com/christianalfoni/alwaysprogress'
        },
        {
          id: 24477005,
          name: 'angular-flux',
          full_name: 'christianalfoni/angular-flux',
          private: false,
          html_url: 'https://github.com/christianalfoni/angular-flux'
        }
      ];

      const mockedContext = {
        props: {
          result: githubRepos
        }
      };

      const expectedResult = {
        result: [
          {
            id: 10420161,
            name: 'alwaysprogress',
            html_url: 'https://github.com/christianalfoni/alwaysprogress'
          },
          {
            id: 24477005,
            name: 'angular-flux',
            html_url: 'https://github.com/christianalfoni/angular-flux'
          }
        ]
      };
      const result = processRepos(mockedContext);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('processUsers()', () => {
    it('correctly transforms users data', () => {
      const githubUsers = [
        {
          login: 'christianalfoni',
          id: 3956929,
          avatar_url: 'https://avatars.githubusercontent.com/u/3956929?v=3',
          url: 'https://api.github.com/users/christianalfoni'
        },
        {
          login: 'edgesoft',
          id: 6061720,
          avatar_url: 'https://avatars.githubusercontent.com/u/6061720?v=3',
          url: 'https://api.github.com/users/edgesoft'
        }
      ];

      const mockedContext = {
        props: {
          result: githubUsers
        }
      };

      const expectedResult = {
        result: {
          3956929: {
            id: 3956929,
            login: 'christianalfoni'
          },
          6061720: {
            id: 6061720,
            login: 'edgesoft'
          }
        }
      };
      const result = processUsers(mockedContext);

      expect(result).toEqual(expectedResult);
    });
  });
});

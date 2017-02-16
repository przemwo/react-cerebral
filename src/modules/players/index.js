import { form, changeField } from 'cerebral-forms';
import { set, when } from 'cerebral/operators';
import { state } from 'cerebral/tags';

import { VIEWS } from 'common/constants';
import changeView from 'common/chains/factories/changeView';
import createPlayer from './chains/factories/createPlayer';
import removePlayer from './chains/removePlayer';

export default function players ({ path }) {
  return {
    state: {
      data: Object.create(null),
      newPlayer: form({
        name: {
          value: '',
          isRequired: true,
          requiredMessage: 'Player name is required'
        },
        score: {
          value: '0',
          validationRules: ['isNumeric'],
          validationMessages: ['Score must be a numeric value']
        },
        showErrors: false
      })
    },
    signals: {
      newPlayerSubmitted: createPlayer(`${path}.newPlayer`),
      removePlayerClicked: removePlayer,
      fieldChanged: [
        when(state`${path}.newPlayer.showErrors`), {
          true: [],
          false: [
            set(state`${path}.newPlayer.showErrors`, true)
          ]
        },
        changeField
      ],
      routed: changeView(VIEWS.PLAYERS)
    }
  };
}

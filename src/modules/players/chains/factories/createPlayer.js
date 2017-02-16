import { validateForm, isValidForm, resetForm } from 'cerebral-forms';
import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';

import createPlayerWithNameAndScore from '../../actions/createPlayerWithNameAndScore';

export default function createPlayerFactory (formPath) {
  return [
    validateForm(state`${formPath}`),
    isValidForm(state`${formPath}`), {
      true: [
        createPlayerWithNameAndScore,
        resetForm(state`${formPath}`),
        set(state`${formPath}.showErrors`, false)
      ],
      false: [
        set(state`${formPath}.showErrors`, true)
      ]
    }
  ];
}

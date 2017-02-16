import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';

import { VIEWS } from 'common/constants';

import updateSubtitle from './updateSubtitle';

export default {
  state: {
    currentView: VIEWS.PLAYERS,
    subTitle: 'Hello!'
  },
  signals: {
    changeSubtitle: [
      updateSubtitle
    ],
    notFoundRouted: [
      set(state`app.currentView`, VIEWS.NOT_FOUND)
    ]
  }
};

import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';

import { VIEWS } from 'common/constants';

export default {
  state: {
    currentView: VIEWS.PLAYERS,
    subTitle: 'Hello!'
  },
  signals: {
    notFoundRouted: [
      set(state`app.currentView`, VIEWS.NOT_FOUND)
    ]
  }
};

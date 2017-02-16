import { set } from 'cerebral/operators';
import { state } from 'cerebral/tags';

export default function changeViewFactory (view) {
  return [
    set(state`app.currentView`, view)
  ];
}

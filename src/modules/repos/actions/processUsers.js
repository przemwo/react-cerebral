import { compose, map, indexBy, pick, prop } from 'ramda';

const transformUsers = compose(
  indexBy(prop('id')),
  map(pick(['id', 'login']))
);

export default function processUsers ({ props }) {
  return {
    result: transformUsers(props.result || [])
  };
}

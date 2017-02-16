import { map, pick } from 'ramda';

const transformRepos = map(pick(['id', 'name', 'html_url']));

export default function processRepos ({ props }) {
  return {
    result: transformRepos(props.result || [])
  };
}

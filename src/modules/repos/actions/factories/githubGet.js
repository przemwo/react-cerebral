export default function githubGetFactory (apiMethod, query = {}) {
  function githubGet ({ http, path, resolve }) {
    return http.get(
      resolve.value(apiMethod),
      query,
      { baseUrl: 'https://api.github.com' }
    )
      .then(path.success)
      .catch(path.error);
  }

  return githubGet;
}

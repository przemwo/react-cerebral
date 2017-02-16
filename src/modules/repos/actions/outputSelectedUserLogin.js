export default function outputSelectedUserLogin ({ state }) {
  const users = state.get('repos.usersById');
  const selectedUserId = state.get('repos.selectedUserId');
  const selectedUser = selectedUserId && users[selectedUserId];

  return {
    login: selectedUser && selectedUser.login
  };
}

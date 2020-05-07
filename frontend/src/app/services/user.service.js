import { fetchUsersPending, fetchUsersSuccess, fetchUsersError } from './../actions/index';

function fetchUsers () {
  console.log('fetching users')
  return dispatch => {
    dispatch(fetchUsersPending());
    fetch('http://localhost:3500/api/status')
      .then(res => res.json())
      .then(res => {
        if (!res || !res.success) {
          throw (res.message);
        }
        dispatch(fetchUsersSuccess(res));
        console.log('fetching complete')
        console.log(res)
        return res;
      })
      .catch(error => {
        dispatch(fetchUsersError(error));
      })
  }
}

export default fetchUsers;
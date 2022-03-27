import axios from 'axios';

//ACTION TYPES
const SET_USERS = 'SET_USERS';

//ACTION CREATORS
const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

//THUNK CREATORS

export const fetchUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/users');
    dispatch(setUsers(data));
  };
};

export default function users(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
